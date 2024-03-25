package com.kkirikkiri.domain.learning.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ContentResponse implements Serializable {

    private Long storyId;
    private Integer lineId;
    private String koreanSentence;
    private String translatedSentence;
    private String imageUrl;
    private String maleVoiceUrl;
    private String femaleVoiceUrl;

}
