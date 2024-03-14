package com.kkirikkiri.domain.member.controller;

import com.kkirikkiri.domain.member.dto.LoginRequest;
import com.kkirikkiri.domain.member.dto.MemberInfo;
import com.kkirikkiri.domain.member.dto.RegisterRequest;
import com.kkirikkiri.domain.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


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
            @RequestBody @Valid LoginRequest loginRequest
    ) {

        // JWT토큰을 생성하였다. jwt라이브러리를 이용하여 생성.
//        String accessToken = jwtTokenizer.createAccessToken(member.getId(), member.getLoginId());
//        String refreshToken = jwtTokenizer.createRefreshToken(member.getId(), member.getLoginId());

        // RefreshToken을 DB에 저장한다. 성능 때문에 DB가 아니라 Redis에 저장하는 것이 좋다.
//        RefreshToken refreshTokenEntity = new RefreshToken();
//        refreshTokenEntity.setValue(refreshToken);
//        refreshTokenEntity.setMemberId(member.getMemberId());
//        refreshTokenService.addRefreshToken(refreshTokenEntity);
//
//        MemberInfo loginResponse = MemberInfo.builder()
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .memberId(member.getMemberId())
//                .nickname(member.getName())
//                .build();
        return ResponseEntity.ok(memberService.login(loginRequest));

    }



}
