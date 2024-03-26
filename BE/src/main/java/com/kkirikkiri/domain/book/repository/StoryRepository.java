package com.kkirikkiri.domain.book.repository;

import com.kkirikkiri.domain.book.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, Long> {

    List<Story> findAllByMemberId(Long memberId);
    Optional<Story> findById(Long storyId);
}
