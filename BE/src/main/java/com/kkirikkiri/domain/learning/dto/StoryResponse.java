package com.kkirikkiri.domain.learning.dto;

import com.kkirikkiri.domain.learning.dto.ContentResponse;
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
public class StoryResponse implements Serializable {

    @Id
    private Long id;
    private Long memberId;
    private String memberNickname;
    private String title;
    private List<ContentResponse> contents;
    private LearningResponse learning;
}
