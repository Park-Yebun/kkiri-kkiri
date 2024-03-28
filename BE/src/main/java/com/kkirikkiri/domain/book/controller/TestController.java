package com.kkirikkiri.domain.book.controller;

import com.kkirikkiri.domain.book.dto.LibraryResponse;
import com.kkirikkiri.domain.book.service.LibraryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping
@RestController
@Slf4j
public class TestController {

    private final LibraryService libraryService;

    @GetMapping("/{A}")
    public ResponseEntity<String> getAllBooks(@PathVariable String A) {
        System.out.println("/" + A);
        return ResponseEntity.ok("ㅁㄴㅇㄹ");
    }
}
