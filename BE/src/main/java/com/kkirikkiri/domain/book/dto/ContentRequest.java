package com.kkirikkiri.domain.book.dto;

import lombok.Getter;

@Getter
public class ContentRequest {

    private Long storyId;
    private Integer lineId;
    private String koreanSentence;
    private String translatedSentence;
    private String imageDescription;
    private String summary;

}
