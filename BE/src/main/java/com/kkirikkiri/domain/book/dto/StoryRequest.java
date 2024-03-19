package com.kkirikkiri.domain.book.dto;

import com.kkirikkiri.domain.book.entity.enums.OpenState;
import lombok.Getter;

@Getter
public class StoryRequest {

    private String loginId;
    private String title;
    private OpenState openState;

}
