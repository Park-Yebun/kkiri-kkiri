package com.kkirikkiri.domain.member.service;

import com.kkirikkiri.domain.member.dto.RegisterRequest;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public Long registerMember(RegisterRequest registerRequest){
        Member member = Member.builder()
                .loginId(registerRequest.getLoginId())
                .password(registerRequest.getPassword())
                .nickname(registerRequest.getNickname())
                .age(registerRequest.getAge())
                .level(registerRequest.getLevel())
                .thumbnail(registerRequest.getThumbnail())
                .build();
        memberRepository.save(member);

        return member.getId();
    }

    @Transactional(readOnly = true)
    public Member findByLoginId(String loginId) {
        return memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));
    }



}
