package com.kkirikkiri.domain.book.repository;

import com.kkirikkiri.domain.book.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findAllByStoryId(Long storyId);
}
