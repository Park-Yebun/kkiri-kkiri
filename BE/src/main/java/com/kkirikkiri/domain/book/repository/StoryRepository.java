package com.kkirikkiri.domain.book.repository;

import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.book.entity.enums.OpenState;
import com.kkirikkiri.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, Long> {

    List<Story> findAllByMemberId(Long memberId);
    Optional<Story> findById(Long storyId);

    List<Story> findByOpenState(OpenState openState);
}
