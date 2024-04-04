package com.kkirikkiri.domain.book.dto;

import lombok.Builder;
import lombok.Getter;
@Builder
@Getter
public class ImageRequest {

    private Long storyId;
    private Integer lineId;
    private String prompt;

}
