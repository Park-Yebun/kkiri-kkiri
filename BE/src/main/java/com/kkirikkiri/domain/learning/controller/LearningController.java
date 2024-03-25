package com.kkirikkiri.domain.learning.controller;

import com.kkirikkiri.domain.learning.dto.LearningRequest;
import com.kkirikkiri.domain.learning.dto.LearningResponse;
import com.kkirikkiri.domain.learning.dto.StoryResponse;
import com.kkirikkiri.domain.learning.service.LearningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/learn")
@RestController
public class LearningController {

    private final LearningService learningService;

    // 학습 페이지에서 동화책 상세 페이지 조회
    @GetMapping("/{storyId}")
    public ResponseEntity<StoryResponse> getLearningBook(@PathVariable Long storyId) {
        StoryResponse storyResponse = learningService.getLearningBook(storyId);
        return ResponseEntity.ok(storyResponse);
    }


    // 학습 데이터 업데이트
    @PutMapping("/{learningId}")
    public ResponseEntity<?> modifyLearningBook(
            @PathVariable Long learningId, @RequestBody LearningRequest learningRequest) {
        return ResponseEntity.ok(learningService.modifyLearningBook(learningId, learningRequest));
    }
}