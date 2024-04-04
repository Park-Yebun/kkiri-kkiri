package com.kkirikkiri.domain.book.controller;

import com.kkirikkiri.domain.book.dto.LibraryResponse;
import com.kkirikkiri.domain.book.service.LibraryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/library")
@RestController
@Slf4j
public class LibraryController {

    private final LibraryService libraryService;

    @GetMapping("/{loginId}")
    public ResponseEntity<List<LibraryResponse>> getAllBooks(
            @PathVariable String loginId
    ) {
        return ResponseEntity.ok(libraryService.getAllBooks(loginId));
    }
}
