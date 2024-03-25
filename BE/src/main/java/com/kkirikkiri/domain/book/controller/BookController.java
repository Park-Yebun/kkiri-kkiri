package com.kkirikkiri.domain.book.controller;

import com.kkirikkiri.domain.book.dto.ContentRequest;
import com.kkirikkiri.domain.book.dto.StoryRequest;
import com.kkirikkiri.domain.book.dto.StoryResponse;
import com.kkirikkiri.domain.book.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/books")
@RestController
@Slf4j
public class BookController {

    private final BookService bookService;

    // 스토리북 1개 조회
    @GetMapping("/{storyId}")
    public ResponseEntity<StoryResponse> getStoryBook(
        @PathVariable Long storyId
    ) {
        long startTime = System.currentTimeMillis();
        StoryResponse storyResponse = bookService.getStoryBook(storyId);
        long endTime = System.currentTimeMillis();

        log.info("[getStoryBook] Response Time : {}ms", (endTime - startTime));

        return ResponseEntity.ok(storyResponse);
    }

    // 새로운 이야기 생성 (Story 생성)
    @PostMapping
    public ResponseEntity<Long> createStory(
            @RequestBody StoryRequest storyRequest
    ) {
        Long storyId = bookService.createStory(storyRequest);
        return ResponseEntity.ok(storyId);
    }

    // 새로운 이야기 생성 (Content 생성)
    @PostMapping("/contents")
    public ResponseEntity<String> createContent(
            @RequestBody List<ContentRequest> contentRequestList
    ) {

        // 이야기 저장
        String storyResult = bookService.createContent(contentRequestList);
        // 이미지 저장
//        String imageResult = bookService.createImages(contentRequestList);
//        // tts 저장
        bookService.createVoice(contentRequestList);
        return ResponseEntity.ok(storyResult);
    }

    // 동화책 삭제
    @DeleteMapping("/{storyId}")
    public ResponseEntity<String> deleteBook(
            @PathVariable Long storyId
    ) {

        String result = bookService.deleteBook(storyId);
        return ResponseEntity.ok(result);
    }

    // 동화책 제목 수정
    @PatchMapping("/title/{storyId}")
    public ResponseEntity<String> modifyTitle(
            @PathVariable Long storyId,
            @RequestParam String title
    ) {

        String result = bookService.modifyTitle(storyId, title);
        return ResponseEntity.ok(result);
    }
}
