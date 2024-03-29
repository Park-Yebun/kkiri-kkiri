package com.kkirikkiri.domain.book.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class LibraryResponse {

    private Long storyId;
    private String title;
    private String author;
    private String summary;
    private String imageURL;
    private Integer download;
    private LocalDateTime createdAt;
    private boolean isMine;

}
