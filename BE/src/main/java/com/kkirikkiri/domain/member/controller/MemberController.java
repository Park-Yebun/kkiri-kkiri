package com.kkirikkiri.domain.member.controller;

import com.kkirikkiri.domain.member.dto.RegisterRequest;
import com.kkirikkiri.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Long> registerMember (
            @RequestBody RegisterRequest registerRequest
            ) {
        return ResponseEntity.ok(memberService.registerMember(registerRequest));
    }

}
