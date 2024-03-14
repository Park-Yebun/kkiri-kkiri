package com.kkirikkiri.domain.member.dto;

import com.kkirikkiri.domain.member.entity.enums.EnglishLevel;
import lombok.Builder;


@Builder
public record MemberInfo(
        String loginId, String nickname, String thumbnail, Integer age, EnglishLevel level) {
}
