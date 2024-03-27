package com.kkirikkiri.domain.bookshelf.dto;

import lombok.Getter;

@Getter
public class BookshelfRequest {
    private Long storyId; // story PK
    private String loginId;
}
