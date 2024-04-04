package com.kkirikkiri.domain.member.controller;

import com.kkirikkiri.domain.member.dto.LoginRequest;
import com.kkirikkiri.domain.member.dto.MemberInfo;
import com.kkirikkiri.domain.member.dto.RegisterRequest;
import com.kkirikkiri.domain.member.dto.UpdateInfoRequest;
import com.kkirikkiri.domain.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    private ResponseEntity<String> exceptionHandling(Exception e) {
        // 예외 처리 로직을 구현하세요
        // 여기에는 예외에 대한 적절한 처리를 수행하는 코드가 들어갑니다.
        return new ResponseEntity<String>("Error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping
    public ResponseEntity<Long> registerMember(
            @RequestBody RegisterRequest registerRequest
    ) {

        return ResponseEntity.ok(memberService.registerMember(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<MemberInfo> login(
            @RequestBody @Valid LoginRequest loginRequest
    ) {
        return ResponseEntity.ok(memberService.login(loginRequest));
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<?> getMember(@PathVariable() long memberId) {
        try {
            MemberInfo memberInfo = memberService.getMember(memberId);
            if (memberInfo != null)
                return ResponseEntity.ok(memberInfo);
            else
                return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return exceptionHandling(e);

        }
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<?> modifyMember(
            @PathVariable long memberId,
            @RequestBody UpdateInfoRequest updateInfoRequest) {
        try {
            return ResponseEntity.ok(memberService.modifyMember(memberId, updateInfoRequest));
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<String> deleteMember(@PathVariable long memberId) {

        return ResponseEntity.ok(memberService.deleteMember(memberId));

    }

    // 아이디 중복 검사
    @GetMapping("/{loginId}/check-login-id")
    public ResponseEntity<Boolean> checkLoginId(@PathVariable String loginId) {
        return ResponseEntity.ok(memberService.checkLoginId(loginId));
    }

    // 닉네임 중복 검사
    @GetMapping("/{nickName}/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@PathVariable String nickName) {
        return ResponseEntity.ok(memberService.checkNickname(nickName));
    }
}

