package com.kkirikkiri.domain.book.service;

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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRedisRepository bookRedisRepository;
    private final StoryRepository storyRepository;
    private final ContentRepository contentRepository;
    private final MemberRepository memberRepository;


    public StoryResponse getStoryBook(Long storyId) {

        // Cache Logic
        Optional<StoryResponse> storyDTO = bookRedisRepository.findById(storyId);
        if (storyDTO.isPresent()) {
            log.info("[동화책] Cache Data exists.");
            return storyDTO.get();
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

    public Long createContent(List<ContentRequest> contentRequest) {

        // 클로바 TTS API

        return 0L;
    }
}
