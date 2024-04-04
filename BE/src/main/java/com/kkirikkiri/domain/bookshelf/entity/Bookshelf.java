package com.kkirikkiri.domain.bookshelf.entity;

import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Bookshelf {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "story_id")
    private Story story;

}
