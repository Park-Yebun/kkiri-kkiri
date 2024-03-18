package com.kkirikkiri.domain.learning.entity;

import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.entity.enums.EnglishLevel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Learning {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "learning_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    private Member member;

//    @OneToOne(fetch = LAZY)
//    private Story story;

    @Column
    private Integer lineNo;

    @Column
    private Integer completeNo;




}
