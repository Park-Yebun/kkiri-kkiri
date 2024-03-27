package com.kkirikkiri.domain.learning.controller;

import com.kkirikkiri.domain.learning.dto.SpeakingRequest;
import com.kkirikkiri.domain.learning.dto.WritingRequest;
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


    // 쓰기 학습 데이터 업데이트
    @PutMapping("/{learningId}/write")
    public ResponseEntity<?> modifyWritingData(
            @PathVariable Long learningId, @RequestBody WritingRequest writingRequest) {
        return ResponseEntity.ok(learningService.modifyWritingData(learningId, writingRequest));
    }

        
    // 말하기 학습 데이터 업데이트
    @PutMapping("/{learningId}/speak")
    public ResponseEntity<?> modifySpeakingData(
            @PathVariable Long learningId, @RequestBody SpeakingRequest speakingRequest) {
        return ResponseEntity.ok(learningService.modifySpeakingData(learningId, speakingRequest));
    }
    
    
    // 초기 학습 데이터 생성
    @PostMapping("/{storyId}")
    public ResponseEntity<?> createLearningData(
            @PathVariable Long storyId) {
        return ResponseEntity.ok(learningService.createLearningData(storyId));
    }
}