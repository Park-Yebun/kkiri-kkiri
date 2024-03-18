package com.kkirikkiri.domain.member.controller;

import ch.qos.logback.classic.Logger;
import com.kkirikkiri.domain.member.dto.LoginRequest;
import com.kkirikkiri.domain.member.dto.MemberInfo;
import com.kkirikkiri.domain.member.dto.RegisterRequest;
import com.kkirikkiri.domain.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Long> registerMember(
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

    @GetMapping("/{id}")
    public ResponseEntity<?> getMember(@PathVariable() long id) {
        try {
            MemberInfo memberInfo = memberService.getMember(id);
            if (memberInfo != null)
                return new ResponseEntity<MemberInfo>(memberInfo, HttpStatus.OK);
            else
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return exceptionHandling(e);

        }
    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        // 예외 처리 로직을 구현하세요
        // 여기에는 예외에 대한 적절한 처리를 수행하는 코드가 들어갑니다.
        return new ResponseEntity<String>("Error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}

