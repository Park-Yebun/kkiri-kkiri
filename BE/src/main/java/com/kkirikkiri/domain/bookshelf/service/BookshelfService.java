package com.kkirikkiri.domain.bookshelf.service;

import com.kkirikkiri.domain.book.dto.StoryResponse;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.bookshelf.dto.BookshelfResponse;
import com.kkirikkiri.domain.bookshelf.entity.Bookshelf;
import com.kkirikkiri.domain.bookshelf.repository.BookshelfRepository;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookshelfService {

    private final BookshelfRepository bookshelfRepository;
    private final StoryRepository storyRepository;
    private final MemberRepository memberRepository;

    // 동화책 전체 조회: 내가 만든 동화책 + 다른 사람이 만든 동화책
    public List<BookshelfResponse> getAllStories(String loginId) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        List<Story> stories = storyRepository.findByMemberId(member.getId());

        // 내가 만든 책
        List<BookshelfResponse> bookshelfResponses = stories.stream()
                .map(story -> {
                    return BookshelfResponse.builder()
                            .storyId(story.getId())
                            .title(story.getTitle())
                            .author(member.getNickname())
                            .build();
                })
                .toList();

        // 다른 사람이 만든 책
        List<Bookshelf> books = bookshelfRepository.findByMemberId(member.getId());
        
        // 로직 추가 필요

        return bookshelfResponses;
    }
}
