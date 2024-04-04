package com.kkirikkiri.domain.book.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.kkirikkiri.domain.book.dto.*;
import com.kkirikkiri.domain.book.entity.Content;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.entity.enums.OpenState;
import com.kkirikkiri.domain.book.repository.BookRedisRepository;
import com.kkirikkiri.domain.book.repository.ContentRepository;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.learning.entity.Learning;
import com.kkirikkiri.domain.learning.repository.LearningRepository;
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
    private final LearningRepository learningRepository;

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
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 동화책이 없습니다."));


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

        // DB에서 가져온 데이터 캐시에 넣기
//            bookRedisRepository.save(storyResponse);
        return StoryResponse.builder()
                .id(story.getId())
                .memberId(story.getMember().getId())
                .memberNickname(story.getMember().getNickname())
                .title(story.getTitle())
                .openState(story.getOpenState())
                .summary(story.getSummary())
                .createdAt(story.getCreatedAt())
                .contents(contentResponses)
                .build();

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
            Content existingContent = contentRepository.findByStoryIdAndLineId(
                    contentRequest.getStoryId(),
                    contentRequest.getLineId()
            );

            if (existingContent != null) {
//                log.info("이미 있는 데이터!");
                existingContent.setKoreanSentence(contentRequest.getKoreanSentence());
                existingContent.setTranslatedSentence(contentRequest.getTranslatedSentence());
                existingContent.setImageDescription(contentRequest.getImageDescription());
                contentRepository.save(existingContent);
            } else {
//                log.info("새로 추가한 데이터!");
                Content content = new Content();
                content.setStory(Story.builder().id(contentRequest.getStoryId()).build());
                content.setLineId(contentRequest.getLineId());
                content.setKoreanSentence(contentRequest.getKoreanSentence());
                content.setTranslatedSentence(contentRequest.getTranslatedSentence());
                content.setImageDescription(contentRequest.getImageDescription());
                contentRepository.save(content);
            }
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


    // 동화책을 다 작성하고, 마지막에 제목 작성할때 요약 데이터도 같이 넣어주기!!
    public String modifyBook(long storyId, ModifyRequest modifyRequest) {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new IllegalArgumentException("동화책이 존재하지 않습니다."));

        Story updatedStory = Story.builder()
                .id(story.getId())
                .member(story.getMember())
                .title(modifyRequest.getTitle())
                .openState(modifyRequest.getOpenState())
                .summary(modifyRequest.getSummary())
                .build();

        storyRepository.save(updatedStory);

        return "동화책이 성공적으로 변경됐습니다.";
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

    // 동화책 전체 조회: 내가 만든 동화책
    public List<MyBookResponse> getAllStoryBooks(String loginId) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        List<Story> stories = storyRepository.findAllByMemberId(member.getId());

        // 내가 만든 책

        return stories.stream()
                .map(story -> {
                    Optional<Learning> learningOptional = learningRepository.findByMemberIdAndStoryIdOptional(member.getId(), story.getId());
                    boolean isLearned = false;
                    if (learningOptional.isPresent()) {
                        if (learningOptional.get().getSpeakingCpltNo() != 0 || learningOptional.get().getWritingCpltNo() != 0) {
                            isLearned = true;
                        }
                    }

                    // 스토리별로 첫번째 이미지를 가져와서 비어있는 값과 아닌값 구분해 넣어주기
                    Content content1 = contentRepository.findByStoryIdAndLineId(story.getId(), 1);
                    String imageUrl = content1 != null ? content1.getImageUrl() : "";

                    // 이야기 미완성 여부 확인 -- 스토리별로 10번째 문장이 비어있는지 아닌지 여부 확인
                    Content content2 = contentRepository.findByStoryIdAndLineId(story.getId(), 10);
                    Boolean isCompleted = content2 != null;

                    return MyBookResponse.builder()
                            .storyId(story.getId())
                            .title(story.getTitle())
                            .author(member.getNickname())
                            .imageURL(imageUrl)
                            .summary(story.getSummary())
                            .isLearned(isLearned)
                            .isCompleted(isCompleted)
                            .build();
                })
                .toList();

    }

}
