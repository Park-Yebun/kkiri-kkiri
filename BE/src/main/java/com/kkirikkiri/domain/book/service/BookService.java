package com.kkirikkiri.domain.book.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.kkirikkiri.domain.book.dto.ContentRequest;
import com.kkirikkiri.domain.book.dto.ContentResponse;
import com.kkirikkiri.domain.book.dto.StoryRequest;
import com.kkirikkiri.domain.book.dto.StoryResponse;
import com.kkirikkiri.domain.book.entity.Content;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.repository.BookRedisRepository;
import com.kkirikkiri.domain.book.repository.ContentRepository;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.net.URL;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRedisRepository bookRedisRepository;
    private final StoryRepository storyRepository;
    private final ContentRepository contentRepository;
    private final MemberRepository memberRepository;
    private final AmazonS3 amazonS3;

    @Value("${spring.naver.tts.client-id}")
    private String clientId;
    @Value("${spring.naver.tts.client-secret}")
    private String clientSecret;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public StoryResponse getStoryBook(Long storyId) {

        // Cache Logic
        Optional<StoryResponse> storyResponse = bookRedisRepository.findById(storyId);
        if (storyResponse.isPresent()) {
            log.info("[동화책] Cache Data exists.");
            return storyResponse.get();
        } else {
            log.info("[동화책] Cache Data does NOT exist.");
        }

        // DB에서 데이터 가져오기
        Optional<Story> newStory = storyRepository.findById(storyId);
        if (newStory.isPresent()) {

            List<Content> contents = contentRepository.findAllByStoryId(storyId);
            List<ContentResponse> contentDTO = contents.stream()
                    .map(content -> ContentResponse.builder()
                            .storyId(content.getStory().getId())
                            .lineId(content.getLineId())
                            .koreanSentence(content.getKoreanSentence())
                            .translatedSentence(content.getTranslatedSentence())
                            .imageDescription(content.getImageDescription())
                            .imageUrl(content.getImageUrl())
                            .maleVoiceUrl(content.getMaleVoiceUrl())
                            .femaleVoiceUrl(content.getFemaleVoiceUrl())
                            .build())
                    .toList();

            StoryResponse newStoryDTO = StoryResponse.builder()
                    .id(newStory.get().getId())
                    .title(newStory.get().getTitle())
                    .openState(newStory.get().getOpenState())
                    .contents(contentDTO)
                    .build();

            // DB에서 가져온 데이터 캐시에 넣기
            bookRedisRepository.save(newStoryDTO);
            return newStoryDTO;

        } else {
            throw new RuntimeException("Story with ID " + storyId + " not found.");
        }

    }

    public Long createStory(StoryRequest storyRequest) {

        Member member = memberRepository.findByLoginId(storyRequest.getLoginId())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        return storyRepository.save(
                Story.builder()
                        .member(member)
                        .title(storyRequest.getTitle())
                        .openState(storyRequest.getOpenState())
                        .build())
                .getId();
    }

    public Long createContent(List<ContentRequest> contentRequestList) {

        for (ContentRequest contentRequest : contentRequestList) {

            // 클로바 TTS API (https://api.ncloud-docs.com/docs/ai-naver-clovavoice-ttspremium)
            String english = contentRequest.getTranslatedSentence();
            List<String> voiceUrls = new ArrayList<>(); // null로 하면 NullPointException 남.
            try {
                String maleVoiceUrl = clova(english, "dsinu-matt");
                voiceUrls.add(maleVoiceUrl);
//                log.info("이건 남성 목소리 url 입니다!", maleVoiceUrl);
                String femaleVoiceUrl = clova(english, "dara-danna");
                voiceUrls.add(femaleVoiceUrl);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            Content content = Content.builder()
                    .story(Story.builder().id(contentRequest.getStoryId()).build())
                    .lineId(contentRequest.getLineId())
                    .koreanSentence(contentRequest.getKoreanSentence())
                    .translatedSentence(contentRequest.getTranslatedSentence())
                    .imageDescription(contentRequest.getImageDescription())
                    .maleVoiceUrl(voiceUrls.getFirst())
                    .femaleVoiceUrl(voiceUrls.getLast())
                    .build();
            contentRepository.save(content);
        }

        // 리턴값 없어도 될 듯.
        return 0L;
    }

    // clova api를 사용해 mp3를 생성하고 s3에 저장하고 url 받아오기
    private String clova(String english, String voice) throws IOException {

        String text = URLEncoder.encode(english, "UTF-8");
//        log.info(text);
        String apiURL = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
        URL url = new URL(apiURL);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
        con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

        String postParams = "speaker=" + voice +"&volume=0&speed=0&pitch=0&format=mp3&text=" + text;
        con.setDoOutput(true);
        try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
            wr.writeBytes(postParams);
            wr.flush();
        }
        int responseCode = con.getResponseCode();
        BufferedReader br;
        if (responseCode == 200) { // 정상 호출
            log.info("여길로 들어왔다!");
            try (InputStream is = con.getInputStream()) {
                String fileName = Long.valueOf(new Date().getTime()).toString() + ".mp3";
                amazonS3.putObject(new PutObjectRequest(bucketName, fileName, is, null)); // Upload the file to Amazon S3
                return amazonS3.getUrl(bucketName, fileName).toString(); // Construct the URL for the uploaded file
            }
        } else {
            log.error("Failed to receive the voice data. Response code: {}", responseCode);
        }
        return "";
    }

}
