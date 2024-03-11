package com.kkirikkiri.domain.member.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginRequest {
    @NotEmpty
    public String loginId;

    @NotEmpty
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,15}$")
    // 영문, 특수문자 8자 이상 15자 이하
    public String password;
}
