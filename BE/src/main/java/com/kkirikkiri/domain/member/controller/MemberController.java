package com.kkirikkiri.domain.member.controller;

import com.kkirikkiri.domain.member.dto.LoginRequest;
import com.kkirikkiri.domain.member.dto.MemberInfo;
import com.kkirikkiri.domain.member.dto.RegisterRequest;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

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

    @GetMapping
    public ResponseEntity<MemberInfo> login(
            @RequestBody @Valid LoginRequest loginRequest,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        Member member = memberService.findByLoginId(loginRequest.getLoginId());

        if (!Objects.equals(member.getPassword(), loginRequest.getPassword())) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        return null;
    }



}
