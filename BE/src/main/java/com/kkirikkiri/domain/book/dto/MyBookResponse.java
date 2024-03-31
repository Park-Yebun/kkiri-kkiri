package com.kkirikkiri.domain.book.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyBookResponse {

    private Long storyId; // story PK
    private String title; // 제목
    private String author; // 작가 이름
    private String imageURL; // 썸네일이미지
    private String summary; // 요약
    private Boolean isLearned; // 쓰기,말하기 중 하나라도 학습했는지 여부
    private Boolean isCompleted; // 그림이 있는 완성된 동화책인지 여부
}
