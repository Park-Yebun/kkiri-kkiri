package com.kkirikkiri.domain.book.entity;

import com.kkirikkiri.domain.learning.entity.Learning;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Content {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "story_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Story story;

    @Column
    private Integer lineId;

    @Column
    private String koreanSentence;

    @Column
    private String translatedSentence;

    @Column
    private String imageDescription;

    @Column
    private String imageUrl;

    @Column
    private String maleVoiceUrl;

    @Column
    private String femaleVoiceUrl;
}
