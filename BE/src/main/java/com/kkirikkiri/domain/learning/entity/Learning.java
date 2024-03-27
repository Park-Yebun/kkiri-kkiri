package com.kkirikkiri.domain.learning.entity;

import com.kkirikkiri.domain.book.entity.Story;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.entity.enums.EnglishLevel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Learning {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "story_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Story story;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ColumnDefault("0")
    private Integer writingLineNo;

    @ColumnDefault("0")
    private Integer speakingLineNo;

    @ColumnDefault("0")
    private Integer writingCpltNo;

    @ColumnDefault("0")
    private Integer speakingCpltNo;




}
