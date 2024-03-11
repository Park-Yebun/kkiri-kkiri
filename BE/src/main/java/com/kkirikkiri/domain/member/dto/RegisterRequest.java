package com.kkirikkiri.domain.member.dto;

import com.kkirikkiri.domain.member.entity.enums.EnglishLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String loginId;
    private String password;
    private String nickname;
    private Integer age;
    private EnglishLevel level;
    private String thumbnail;
}
