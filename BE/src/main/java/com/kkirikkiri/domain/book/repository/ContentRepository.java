package com.kkirikkiri.domain.book.repository;

import com.kkirikkiri.domain.book.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findAllByStoryId(Long storyId);

    @Query("SELECT c FROM Content c WHERE c.story.id = :storyId AND c.lineId = :lineId")
    Content findByStoryIdAndLineId(Long storyId, Integer lineId);
}
