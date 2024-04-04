package com.kkirikkiri.domain.bookshelf.controller;

import com.kkirikkiri.domain.book.dto.StoryResponse;
import com.kkirikkiri.domain.bookshelf.dto.BookshelfRequest;
import com.kkirikkiri.domain.bookshelf.dto.BookshelfResponse;
import com.kkirikkiri.domain.bookshelf.service.BookshelfService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/bookshelves")
@RestController
@Slf4j
public class BookshelfController {

    private final BookshelfService bookshelfService;

    @GetMapping("/{loginId}")
    public ResponseEntity<List<BookshelfResponse>> getAllStories(
            @PathVariable String loginId
    ) {
        // 전체 책 제목
        return ResponseEntity.ok(bookshelfService.getAllStories(loginId));
    }

    @PostMapping
    public ResponseEntity<String> createBookshelf(
            @RequestBody BookshelfRequest bookshelfRequest
    ) {

        String result = bookshelfService.createBookshelf(bookshelfRequest);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteBookshelf(
            @RequestBody BookshelfRequest bookshelfRequest
    ) {

        String result = bookshelfService.deleteBookshelf(bookshelfRequest);
        return ResponseEntity.ok(result);
    }
}
