package com.kkirikkiri.domain.learning.service;

import com.kkirikkiri.domain.bookshelf.entity.Bookshelf;
import com.kkirikkiri.domain.learning.dto.*;
import com.kkirikkiri.domain.book.entity.Content;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.repository.ContentRepository;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.member.repository.MemberRepository;
import com.kkirikkiri.domain.learning.entity.Learning;
import com.kkirikkiri.domain.learning.repository.LearningRepository;
import com.kkirikkiri.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class LearningService {
    private final LearningRepository learningRepository;
    private final StoryRepository storyRepository;
    private final ContentRepository contentRepository;
    private final MemberRepository memberRepository;

    public StoryResponse getLearningBook(Long storyId) {
        Optional<Story> story = storyRepository.findById(storyId);
        if (story.isPresent()) {
            // 스토리 1개에 붙일 콘텐츠 리스트 가져오기
            List<Content> contents = contentRepository.findAllByStoryId(storyId);
            List<ContentResponse> contentResponses = contents.stream()
                    .map(content -> ContentResponse.builder()
                            .storyId(content.getStory().getId())
                            .lineId(content.getLineId())
                            .koreanSentence(content.getKoreanSentence())
                            .translatedSentence(content.getTranslatedSentence())
                            .imageUrl(content.getImageUrl())
                            .maleVoiceUrl(content.getMaleVoiceUrl())
                            .femaleVoiceUrl(content.getFemaleVoiceUrl())
                            .build())
                    .toList();
            // 스토리 1개에 붙일 공부 리스트 가져오기
            List<Learning> learnings = learningRepository.findAllByStoryId(storyId);
            List<LearningResponse> learningResponses = learnings.stream()
                    .map(learning -> LearningResponse.builder()
                            .learingId(learning.getId())
                            .storyId(learning.getStory().getId())
                            .writingLineNo(learning.getWritingLineNo())
                            .speakingLineNo(learning.getSpeakingLineNo())
                            .writingCpltNo(learning.getSpeakingCpltNo())
                            .speakingCpltNo(learning.getSpeakingCpltNo())
                            .build())
                    .toList();

            // 스토리 1개에 콘텐츠랑 공부 리스트 붙이기
            StoryResponse storyResponse = StoryResponse.builder()
                    .id(story.get().getId())
                    .memberId(story.get().getMember().getId())
                    .memberNickname(story.get().getMember().getNickname())
                    .title(story.get().getTitle())
                    .contents(contentResponses)
                    .learnings(learningResponses)
                    .build();

            return storyResponse;
        } else {
            throw new RuntimeException("Story with ID " + storyId + " not found.");
        }
    }
    public Long modifyWritingData(Long learningId, WritingRequest writingRequest) {
        Optional<Learning> optionalLearning = learningRepository.findById(learningId); // 기존 데베에 있는 회원정보 가져오기

        if (optionalLearning.isPresent()) {
            Learning learning = optionalLearning.get();
            if (writingRequest.getWritingLineNo().equals(10)) {
                learning.setWritingLineNo(writingRequest.getWritingLineNo());
                learning.setWritingCpltNo(learning.getWritingCpltNo()+1);
            } else {
                learning.setWritingLineNo(writingRequest.getWritingLineNo());
            }
            return learning.getId();

        } else {
            throw new IllegalArgumentException("학습 데이터 업데이트에 실패했습니다.");
        }
    }

    public Long modifySpeakingData(Long learningId, SpeakingRequest speakingRequest) {
        Optional<Learning> optionalLearning = learningRepository.findById(learningId); // 기존 데베에 있는 회원정보 가져오기

        if (optionalLearning.isPresent()) {
            Learning learning = optionalLearning.get();
            if (speakingRequest.getSpeakingLineNo().equals(10)) {
                learning.setSpeakingLineNo(speakingRequest.getSpeakingLineNo());
                learning.setSpeakingCpltNo(learning.getSpeakingCpltNo()+1);
            } else {
                learning.setWritingLineNo(speakingRequest.getSpeakingLineNo());
            }
            return learning.getId();

        } else {
            throw new IllegalArgumentException("학습 데이터 업데이트에 실패했습니다.");
        }
    }

    // 스토리 정보에서 member_id 가져와서 그 정보를 넣고 save해주기
    public Long createLearningData(Long storyId) {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 동화책이 없습니다."));
        Member member = story.getMember();
        return learningRepository.save(
                        Learning.builder()
                                .story(story)
                                .member(member)
                                .build())
                .getId();
    }

}
