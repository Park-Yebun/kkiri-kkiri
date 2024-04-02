package com.kkirikkiri.domain.book.dto;

import com.kkirikkiri.domain.book.entity.enums.OpenState;
import lombok.Getter;

@Getter
public class ModifyRequest {

    private String title;
    private String summary;
    private OpenState openState;
}
