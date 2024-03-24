package com.kkirikkiri.domain.learning.service;

import com.amazonaws.services.s3.AmazonS3;
import com.kkirikkiri.domain.book.entity.Content;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.repository.ContentRepository;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.learning.dto.LearningRequest;
import com.kkirikkiri.domain.learning.dto.LearningResponse;
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
    private final AmazonS3 amazonS3;

    public LearningResponse getLearningBook(Long storyId) {
        Optional<Story> story = storyRepository.findById(storyId);
        List<Content> contents = contentRepository.findAllByStoryId(storyId);
        if (story.isPresent()) {
            List<Learning> learnings = learningRepository.findAllByStoryId(storyId);
            LearningResponse learningResponse = LearningResponse.builder()
                    .id(learnings.get(0).getId())
                    .storyId(story.get().getId())
                    .memberId(story.get().getMember().getId())
                    .lineId(contents.get(0).getLineId())
                    .lineNo(learnings.get(0).getLineNo())
                    .completeNo(learnings.get(0).getCompleteNo())
                    .koreanSentence(contents.get(0).getKoreanSentence())
                    .translatedSentence(contents.get(0).getTranslatedSentence())
                    .imageUrl(contents.get(0).getImageUrl())
                    .maleVoiceUrl(contents.get(0).getMaleVoiceUrl())
                    .femaleVoiceUrl(contents.get(0).getFemaleVoiceUrl())
                    .build();
            return learningResponse;
        } else {
            throw new RuntimeException("Story with ID " + storyId + " not found.");
        }
    }

    public Long modifyLearningBook(Long learningId, LearningRequest learningRequest) {
        Optional<Learning> optionalLearning = learningRepository.findById(learningId); // 기존 데베에 있는 회원정보 가져오기

        if (optionalLearning.isPresent()) {
            Learning learning = optionalLearning.get();
            learning.setLineNo(learningRequest.getLineNo());
            learning.setCompleteNo(learningRequest.getCompleteNo());

            return learning.getId();
            
        } else {
            throw new IllegalArgumentException("학습 데이터 업데이트에 실패했습니다.");
        }
    }
}
