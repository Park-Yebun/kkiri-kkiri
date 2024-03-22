package com.kkirikkiri.domain.book.dto;

import lombok.Getter;

@Getter
public class ImageRequest {

    private Long storyId;
    private Integer lineId;
    private String prompt;

}
