package com.kkirikkiri.domain.book.entity;

import com.kkirikkiri.domain.book.entity.enums.OpenState;
import com.kkirikkiri.domain.learning.entity.Learning;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.global.common.BaseEntity;
import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.Date;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Story extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "story_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @Column(nullable = true, length = 127)
    private String title;

    @Builder.Default
    @Enumerated(STRING)
    private OpenState openState = OpenState.PRIVATE;

    @Column(length = 511)
    private String summary;
}
