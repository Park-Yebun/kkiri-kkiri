package com.kkirikkiri.domain.learning.repository;

import com.kkirikkiri.domain.learning.entity.Learning;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface LearningRepository extends JpaRepository <Learning, Long> {
    List<Learning> findAllByStoryId(Long storyId);

    Optional<Learning> findById(Long learningId);

    Learning findByMemberIdAndStoryId(Long memberId, Long storyId);

    @Query("SELECT l FROM Learning l WHERE l.member.id = :memberId AND l.story.id = :storyId")
    Optional<Learning> findByMemberIdAndStoryIdOptional(@Param("memberId") Long memberId, @Param("storyId") Long storyId);

}
