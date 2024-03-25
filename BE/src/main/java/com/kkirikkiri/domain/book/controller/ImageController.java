package com.kkirikkiri.domain.book.controller;

import com.kkirikkiri.domain.book.dto.ContentRequest;
import com.kkirikkiri.domain.book.dto.ImageResponse;
import com.kkirikkiri.domain.book.entity.Content;
import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.repository.ContentRepository;
import com.kkirikkiri.domain.book.repository.StoryRepository;
import com.kkirikkiri.domain.book.service.BookService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/images")
@RestController
@Slf4j
public class ImageController {

    private final BookService bookService;

    @PostMapping
    @Transactional
    public ResponseEntity<String> receiveImageFilename(
            @RequestBody ImageResponse imageResponse
    ) {
        log.info("이미지 url은?!?! " + imageResponse.getImageUrl());

        bookService.saveImageUrl(imageResponse);

        return ResponseEntity.ok("이미지 url이 저장됐습니다.");

    }


}
