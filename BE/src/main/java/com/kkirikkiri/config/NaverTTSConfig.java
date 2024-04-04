package com.kkirikkiri.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class NaverTTSConfig {

    @Value("${spring.naver.tts.client-id}")
    private String clientId;

    @Value("${spring.naver.tts.client-secret}")
    private String clientSecret;
}
