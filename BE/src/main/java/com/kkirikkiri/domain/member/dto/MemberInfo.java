package com.kkirikkiri.domain.member.dto;

import com.kkirikkiri.domain.member.entity.enums.EnglishLevel;

public record MemberInfo(String nickname, String thumbnail, Integer age, EnglishLevel level) {
}
