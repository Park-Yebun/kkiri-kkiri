package com.kkirikkiri.domain.book.controller;

import com.kkirikkiri.domain.book.dto.ImageResponse;
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
@RequestMapping("/api/images")
@RestController
@Slf4j
public class ImageController {

    private final BookService bookService;

    @PostMapping
    public ResponseEntity<String> receiveImageFilename(
            @RequestBody ImageResponse imageResponse
    ) {
        return ResponseEntity.ok(bookService.saveImageUrl(imageResponse));

    }


}
