package com.kkirikkiri.domain.book.service;

import com.kkirikkiri.domain.book.dto.LibraryResponse;
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
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class LibraryService {

    private final StoryRepository storyRepository;
    private final BookshelfRepository bookshelfRepository;
    private final MemberRepository memberRepository;
    private final ContentRepository contentRepository;

    // 다른사람이 공유한 동화책
    public List<LibraryResponse> getAllLibraries(
            String loginId,
            String filter,
            String orderby,
            String type,
            String text
    ) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        List<Story> stories = null;
        if(type.isEmpty() || text.isEmpty()) {    // 검색필터와 검색어가 하나라도 없으면 전체 조회
            stories = storyRepository.findAllByOpenState(OpenState.PUBLIC);
        } else {    // 검색필터와 검색어가 둘 다 있을 때
            if (type.equals("title")) { //  검색필터가 title이면 제목으로 검색
                stories = storyRepository.findAllByOpenState(OpenState.PUBLIC, text);
            } else if (type.equals("author")) { // 검색필터가 author이면 작가명으로 검색.
                Member author = memberRepository.findByNickname(text)
                        .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

                stories = storyRepository.findAllByOpenStateAndMember(OpenState.PUBLIC, author);
            }
        }

        assert stories != null;
        List<LibraryResponse> libraries = new java.util.ArrayList<>(stories.stream()
                .map(story -> LibraryResponse.builder()
                        .title(story.getTitle())
                        .author(story.getMember().getNickname())
                        .summary(story.getSummary())
                        .imageURL(contentRepository.findByStoryIdAndLineId(story.getId(), 1).getImageUrl())
                        .download(bookshelfRepository.findByStoryId(story.getId()).size())
                        .date(story.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                        .possession(bookshelfRepository.findByMemberIdAndStoryId(member.getId(), story.getId()) != null)
                        .build())
                .toList());

        if (filter.equals("date") ) {
            if(orderby.equals("ASC")) {
                libraries.sort(Comparator.comparing(LibraryResponse::getDate));
            } else if (orderby.equals("DESC")) {
                libraries.sort(Comparator.comparing(LibraryResponse::getDate).reversed());
            }
        } else if(filter.equals("download")) {
            if (orderby.equals("ASC")) {
                libraries.sort(Comparator.comparing(LibraryResponse::getDownload));
            } else if (orderby.equals("DESC")) {
                libraries.sort(Comparator.comparing(LibraryResponse::getDownload).reversed());
            }
        }

        return libraries;
    }
}
