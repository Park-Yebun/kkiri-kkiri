package com.kkirikkiri.domain.learning.controller;

import com.kkirikkiri.domain.learning.dto.LearningResponse;
import com.kkirikkiri.domain.learning.service.LearnService;
import com.kkirikkiri.domain.book.dto.StoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/learn")
@RestController
public class LearningController {

    private final LearnService learnService;

    // 학습 페이지에서 동화책 상세 페이지 조회
    @GetMapping("/{storyId}")
    public ResponseEntity<LearningResponse> getLearningBook(@PathVariable Long storyId) {
        LearningResponse learningResponse = learnService.getLearningBook(storyId);
        return ResponseEntity.ok(learningResponse);
    }


    // 학습 데이터 업데이트
//    @PostMapping("/{storyId}")
//    public ResponseEntity<?> modifyLearningBook(
//            @PathVariable Long storyId, @RequestBody LearningRequest) {
//    }
}