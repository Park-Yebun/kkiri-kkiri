package com.kkirikkiri.domain.book.controller;

import com.kkirikkiri.domain.book.dto.LibraryResponse;
import com.kkirikkiri.domain.book.service.LibraryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/library")
@RestController
@Slf4j
public class LibraryController {

    private final LibraryService libraryService;

    @GetMapping("/{loginId}")
    public ResponseEntity<List<LibraryResponse>> getAllLibraries(
            @PathVariable String loginId,
            @RequestParam(value = "filter", required = false, defaultValue = "date") String filter,
            @RequestParam(value = "orderby", required = false, defaultValue = "DESC") String orderby,
            @RequestParam(value = "type", required = false, defaultValue = "") String type,
            @RequestParam(value = "text", required = false, defaultValue = "") String text
    ) {
        return ResponseEntity.ok(libraryService.getAllLibraries(loginId, filter, orderby, type, text));
    }
}
