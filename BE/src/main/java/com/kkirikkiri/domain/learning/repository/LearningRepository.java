package com.kkirikkiri.domain.learning.repository;

import com.kkirikkiri.domain.learning.entity.Learning;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningRepository extends JpaRepository <Learning, Long> {
    List<Learning> findAllByStoryId(Long storyId);
}
