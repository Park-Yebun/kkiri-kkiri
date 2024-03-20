package com.kkirikkiri.domain.member.dto;

import com.kkirikkiri.domain.member.entity.enums.EnglishLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "아이디를 입력해주세요.")
    private String loginId;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Size(min = 8, max = 15, message = "비밀번호는 8자 이상 15자 이하로 입력해주세요.")
    private String password;

    @NotBlank
    private String nickname;

    @NotBlank
    private Integer age;

    @NotBlank
    private EnglishLevel level;

    @NotBlank
    private String thumbnail;
}
