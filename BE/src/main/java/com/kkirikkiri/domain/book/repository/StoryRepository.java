package com.kkirikkiri.domain.book.repository;

import com.kkirikkiri.domain.book.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
