package com.kkirikkiri.domain.book.dto;

import com.kkirikkiri.domain.book.entity.enums.OpenState;
import lombok.Getter;

import java.util.Date;

@Getter
public class StoryRequest {

    private String loginId;
    private String title;
    private OpenState openState;
    private String summary;
}
