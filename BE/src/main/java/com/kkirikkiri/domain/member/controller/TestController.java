package com.kkirikkiri.domain.member.controller;

import com.kkirikkiri.domain.member.dto.LoginRequest;
import com.kkirikkiri.domain.member.dto.MemberInfo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping
@RestController
public class TestController {

    @GetMapping
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("this is kkiri-kkiri service");

    }
}
