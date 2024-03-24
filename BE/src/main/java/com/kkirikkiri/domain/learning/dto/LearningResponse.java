package com.kkirikkiri.domain.learning.dto;

import com.kkirikkiri.domain.book.dto.ContentResponse;
import com.kkirikkiri.domain.book.entity.enums.OpenState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LearningResponse implements Serializable {

    private Long storyId;
    private Long memberId; 
    private Integer lineId; //문장 번호(식별값)
    private Integer lineNo; //진행 중 문장 번호
    private Integer completeNo; // 학습 완료 횟수

    private String koreanSentence;
    private String translatedSentence;
    private String imageUrl;
    private String maleVoiceUrl;
    private String femaleVoiceUrl;

}
