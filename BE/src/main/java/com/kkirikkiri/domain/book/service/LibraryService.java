package com.kkirikkiri.domain.book.service;

import com.kkirikkiri.domain.book.dto.LibraryResponse;
import com.kkirikkiri.domain.book.entity.Content;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.entity.enums.OpenState;
import com.kkirikkiri.domain.book.repository.BookRedisRepository;
import com.kkirikkiri.domain.book.repository.ContentRepository;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.bookshelf.entity.Bookshelf;
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
                .filter(story -> {
                    // 이야기의 10번째 라인에 해당하는 내용을 가져옴
                    Content content = contentRepository.findByStoryIdAndLineId(story.getId(), 10);
                    // 해당 내용이 존재하면 이야기가 완료된 것으로 판단
                    return content != null;
                })
                .map(story -> {
                    boolean isMine = isStoryMine(story, member);
                    boolean isDownloaded = isDownloaded(story.getId(), member.getId());

                    // 이미지 url
                    Content content = contentRepository.findByStoryIdAndLineId(story.getId(), 1);
                    String imgUrl = "";
                    if (content != null) {
                        imgUrl = content.getImageUrl();
                    }
                    return LibraryResponse.builder()
                            .storyId(story.getId())
                            .title(story.getTitle())
                            .author(story.getMember().getNickname())
                            .summary(story.getSummary())
                            .imageURL(imgUrl)
                            .download(downloadCounts.getOrDefault(story.getId(), 0))
                            .createdAt(story.getCreatedAt())
                            .isMine(isMine)
                            .isDownloaded(isDownloaded)
                            .build();
                })
                .collect(Collectors.toList());

    }
    
    private boolean isStoryMine(Story story, Member loggedInMember) {
        return story.getMember().equals(loggedInMember);
    }

    private boolean isDownloaded(Long storyId, Long memberId) {
        Bookshelf bookshelf = bookshelfRepository.findByMemberIdAndStoryId(memberId, storyId);
        if (bookshelf != null) { // 책장에 있다면 다운로드 한 것
            return true;
        }
        return false;

    }

    private Map<Long, Integer> calculateDownloadCounts(List<Story> stories) {
        return stories.stream()
                .collect(Collectors.toMap(
                        Story::getId,
                        bookshelfRepository::countMembersByStory
                ));
    }
}