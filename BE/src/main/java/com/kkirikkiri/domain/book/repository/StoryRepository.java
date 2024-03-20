package com.kkirikkiri.domain.book.repository;

import com.kkirikkiri.domain.book.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Long> {

    List<Story> findByMemberId(Long memberId);
}
