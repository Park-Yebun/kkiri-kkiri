package com.kkirikkiri.domain.learning.dto;

import com.kkirikkiri.domain.learning.dto.StoryResponse;
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

    private Long id;
    private Long storyId;
    private Integer writingLineNo; //진행 중 문장 번호
    private Integer speakingLineNo;
    private Integer writingCpltNo; // 학습 완료 횟수
    private Integer speakingCpltNo;
}
