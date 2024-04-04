package com.kkirikkiri.domain.learning.service;

import com.amazonaws.services.s3.AmazonS3;
import com.kkirikkiri.domain.learning.dto.*;
import com.kkirikkiri.domain.book.entity.Content;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.repository.ContentRepository;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.learning.entity.Learning;
import com.kkirikkiri.domain.learning.repository.LearningRepository;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.repository.MemberRepository;
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

    public StoryResponse getLearningBook(Long memberId, Long storyId) {

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 동화책이 없습니다."));

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

        // 학습 데이터 가져오기
        Learning learning = learningRepository.findByMemberIdAndStoryId(memberId, storyId);
        LearningResponse learningResponse = LearningResponse.builder()
                .id(learning.getId())
                .storyId(learning.getStory().getId())
                .writingLineNo(learning.getWritingLineNo())
                .speakingLineNo(learning.getSpeakingLineNo())
                .writingCpltNo(learning.getSpeakingCpltNo())
                .speakingCpltNo(learning.getSpeakingCpltNo())
                .build();

        return StoryResponse.builder()
                .id(story.getId())
                .memberId(story.getMember().getId())
                .memberNickname(story.getMember().getNickname())
                .title(story.getTitle())
                .contents(contentResponses)
                .learning(learningResponse)
                .build();

    }

    public Long modifyWritingData(Long learningId, WritingRequest writingRequest) {
        Learning learning = learningRepository.findById(learningId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학습 내역이 없습니다."));

        if (writingRequest.getWritingLineNo().equals(10)) {
            learning.setWritingLineNo(writingRequest.getWritingLineNo());
            learning.setWritingCpltNo(learning.getWritingCpltNo()+1);
        } else {
            learning.setWritingLineNo(writingRequest.getWritingLineNo());
        }
        learningRepository.save(learning);
        return learning.getId();

    }

    public Long modifySpeakingData(Long learningId, SpeakingRequest speakingRequest) {
        Learning learning = learningRepository.findById(learningId)
                .orElseThrow(() -> new IllegalArgumentException("해당 학습 내역이 없습니다."));

        if (speakingRequest.getSpeakingLineNo().equals(10)) {
            learning.setSpeakingLineNo(speakingRequest.getSpeakingLineNo());
            learning.setSpeakingCpltNo(learning.getSpeakingCpltNo()+1);
        } else {
            learning.setSpeakingLineNo(speakingRequest.getSpeakingLineNo());
        }
        learningRepository.save(learning);
        return learning.getId();

    }

    // 스토리id와 멤버id를 클라이언트에서 받아 데이터 save해주기
    public Long createLearningData(LearningRequest learningRequest) {
        Story story = storyRepository.findById(learningRequest.getStoryId())
                .orElseThrow(() -> new IllegalArgumentException("해당 동화책이 없습니다."));
        Member member = memberRepository.findById(learningRequest.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));
        return learningRepository.save(
                        Learning.builder()
                                .story(story)
                                .member(member)
                                .build())
                .getId();
    }

}
