package com.kkirikkiri.domain.book.entity;

import com.kkirikkiri.domain.book.entity.enums.OpenState;
import com.kkirikkiri.domain.learning.entity.Learning;
import com.kkirikkiri.domain.member.entity.Member;
import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Story {

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

    @Column(nullable = false)
    @Enumerated(STRING)
    private OpenState openState;

    @Column(length = 511)
    private String summary;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date")
    private Date createDate;

    @PrePersist
    protected void onCreate() {
        createDate = new Date((System.currentTimeMillis()/1000)*1000);
    }
}
