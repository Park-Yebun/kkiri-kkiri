package com.kkirikkiri.domain.book.dto;

import com.kkirikkiri.domain.book.entity.enums.OpenState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RedisHash(value = "book", timeToLive = 60)
public class StoryResponse implements Serializable {

    @Id
    private Long id;
    private Long memberId;
    private String memberNickname;
    private String title;
    private OpenState openState;
    private String summary;
    private LocalDateTime createdAt;
    private List<ContentResponse> contents;
}
