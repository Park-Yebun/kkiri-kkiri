package com.kkirikkiri.domain.member.dto;

import com.kkirikkiri.domain.member.entity.enums.EnglishLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Builder
public record MemberInfo(
        Long id, String loginId, String nickname, String thumbnail, Integer age, EnglishLevel level) {
    public void setNickname(String nickname) {
    }

    public void setPassword(String password) {
    }

    public void setThumbnail(String thumbnail) {
    }

    public void setlevel(EnglishLevel level) {
    }
}



