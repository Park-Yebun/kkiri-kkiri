package com.kkirikkiri.domain.bookshelf.dto;

import lombok.Builder;

@Builder
public class BookshelfResponse {

    private Long storyId; // story PK
    private String title; // 제목
    private String author; // 작가 이름
}
