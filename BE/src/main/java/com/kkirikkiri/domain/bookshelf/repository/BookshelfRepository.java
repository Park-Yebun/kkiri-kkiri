package com.kkirikkiri.domain.bookshelf.repository;

import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.bookshelf.entity.Bookshelf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookshelfRepository extends JpaRepository<Bookshelf, Long> {

    List<Bookshelf> findByMemberId(Long memberId);

    List<Bookshelf> findByStoryId(Long StoryId);

    Bookshelf findByMemberIdAndStoryId(Long memberId, Long StoryId);

    @Query("SELECT COUNT(DISTINCT b.member) FROM Bookshelf b WHERE b.story = :story")
    Integer countMembersByStory(Story story);
}

