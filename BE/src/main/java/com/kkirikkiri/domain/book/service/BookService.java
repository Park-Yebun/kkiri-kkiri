package com.kkirikkiri.domain.book.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.kkirikkiri.domain.book.dto.*;
import com.kkirikkiri.domain.book.entity.Content;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.repository.BookRedisRepository;
import com.kkirikkiri.domain.book.repository.ContentRepository;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    private final ImageInfoSendTemplate imageInfoSendTemplate;

    @Value("${spring.naver.tts.client-id}")
    private String clientId;
    @Value("${spring.naver.tts.client-secret}")
    private String clientSecret;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public StoryResponse getStoryBook(Long storyId) {

        // Cache Logic
//        Optional<StoryResponse> storyResponse = bookRedisRepository.findById(storyId);
//        if (storyResponse.isPresent()) {
//            log.info("[동화책] Cache Data exists.");
//            return storyResponse.get();
//        } else {
//            log.info("[동화책] Cache Data does NOT exist.");
//        }

        // DB에서 데이터 가져오기
        Optional<Story> newStory = storyRepository.findById(storyId);
        if (newStory.isPresent()) {

            List<Content> contents = contentRepository.findAllByStoryId(storyId);
            List<ContentResponse> contentResponses = contents.stream()
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

            StoryResponse newStoryResponse = StoryResponse.builder()
                    .id(newStory.get().getId())
                    .memberId(newStory.get().getMember().getId())
                    .memberNickname(newStory.get().getMember().getNickname())
                    .title(newStory.get().getTitle())
                    .openState(newStory.get().getOpenState())
                    .summary(newStory.get().getSummary())
                    .contents(contentResponses)
                    .build();

            // DB에서 가져온 데이터 캐시에 넣기
            bookRedisRepository.save(newStoryResponse);
            return newStoryResponse;

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
                        .summary(storyRequest.getSummary())
                        .build())
                .getId();
    }

    @Transactional
    public String createContent(List<ContentRequest> contentRequestList) {

        for (ContentRequest contentRequest : contentRequestList) {

            Content content = Content.builder()
                    .story(Story.builder().id(contentRequest.getStoryId()).build())
                    .lineId(contentRequest.getLineId())
                    .koreanSentence(contentRequest.getKoreanSentence())
                    .translatedSentence(contentRequest.getTranslatedSentence())
                    .imageDescription(contentRequest.getImageDescription())
                    .build();
            contentRepository.save(content);

        }

        return "이야기가 성공적으로 저장됐어요";
    }

    @Transactional
    public void createImages(List<ContentRequest> contentRequestList) {

        for (ContentRequest contentRequest : contentRequestList) {

            // 이미지 생성 Fast API에 storyId, lineId, (prompt) 보내기
            ImageRequest imageRequest = ImageRequest.builder()
                    .storyId(contentRequest.getStoryId())
                    .lineId(contentRequest.getLineId())
                    .prompt(contentRequest.getImageDescription())
                    .build();

            imageInfoSendTemplate.sendGenerateImageRequest(imageRequest);
        }
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
        if (responseCode == 200) { // 정상 호출

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

    public String deleteBook(Long storyId) {

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new IllegalArgumentException("동화책이 존재하지 않습니다."));

        storyRepository.deleteById(storyId);

        return "동화책이 성공적으로 삭제됐습니다.";
    }

    public String modifyTitle(Long storyId, String title) {

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new IllegalArgumentException("동화책이 존재하지 않습니다."));

        Story updatedStory = Story.builder()
                .id(story.getId())
                .member(story.getMember())
                .title(title)
                .openState(story.getOpenState())
                .build();

        storyRepository.save(updatedStory);

        return "동화책의 제목이 성공적으로 변경됐습니다.";
    }

    // DB에 이미지 URL 저장
    @Transactional
    public String saveImageUrl(ImageResponse imageResponse) {

        Content content = contentRepository.findByStoryIdAndLineId(
                imageResponse.getStoryId(), imageResponse.getLineId());

        content.setImageUrl(imageResponse.getImageUrl());
        contentRepository.save(content);

        return "이미지 url이 저장됐습니다.";

    }

    public String createVoice(List<ContentRequest> contentRequestList) {

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

            Content content = contentRepository.findByStoryIdAndLineId(
                    contentRequest.getStoryId(), contentRequest.getLineId());
            content.setMaleVoiceUrl(voiceUrls.get(0));
            content.setFemaleVoiceUrl(voiceUrls.get(1));

            contentRepository.save(content);
        }

        return "TTS가 저장됐어요!";
    }
}
