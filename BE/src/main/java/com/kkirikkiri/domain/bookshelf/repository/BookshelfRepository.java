package com.kkirikkiri.domain.bookshelf.repository;

import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.bookshelf.entity.Bookshelf;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookshelfRepository extends JpaRepository<Bookshelf, Long> {

    List<Bookshelf> findByMemberId(Long memberId);

    Bookshelf findByMemberIdAndStoryId(Long memberId, Long StoryId);

}
