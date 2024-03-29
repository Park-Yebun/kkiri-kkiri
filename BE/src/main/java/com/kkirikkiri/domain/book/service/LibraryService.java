package com.kkirikkiri.domain.book.service;

import com.kkirikkiri.domain.book.dto.LibraryResponse;
import com.kkirikkiri.domain.book.entity.Content;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.entity.enums.OpenState;
import com.kkirikkiri.domain.book.repository.BookRedisRepository;
import com.kkirikkiri.domain.book.repository.ContentRepository;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.bookshelf.repository.BookshelfRepository;
import com.kkirikkiri.domain.bookshelf.service.BookshelfService;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LibraryService {

    private final StoryRepository storyRepository;
    private final MemberRepository memberRepository;
    private final ContentRepository contentRepository;
    private final BookshelfRepository bookshelfRepository;


    public List<LibraryResponse> getAllBooks(String loginId) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        // Open State가 PUBLIC인 책을 전부 보내줌.
        // 그런데 이 책이 내가 만든 책이 아니면, isMine = False, isMine = True
        List<Story> publicStories = storyRepository.findByOpenState(OpenState.PUBLIC);
        
        // bookshelf에서 download 수 구하기
        Map<Long, Integer> downloadCounts = calculateDownloadCounts(publicStories);

        return publicStories.stream()
                .map(story -> {
                    boolean isMine = isStoryMine(story, member);
                    return LibraryResponse.builder()
                            .storyId(story.getId())
                            .title(story.getTitle())
                            .author(story.getMember().getNickname())
                            .summary(story.getSummary())
                            .imageURL(contentRepository.findByStoryIdAndLineId(story.getId(), 1).getImageUrl())
                            .download(downloadCounts.getOrDefault(story.getId(), 0))
                            .createdAt(story.getCreatedAt())
                            .isMine(isMine)
                            .build();
                })
                .collect(Collectors.toList());

    }
    
    private boolean isStoryMine(Story story, Member loggedInMember) {
        return story.getMember().equals(loggedInMember);
    }

    private Map<Long, Integer> calculateDownloadCounts(List<Story> stories) {
        return stories.stream()
                .collect(Collectors.toMap(
                        Story::getId,
                        bookshelfRepository::countMembersByStory
                ));
    }
}