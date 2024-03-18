package com.kkirikkiri.domain.member.service;

import com.kkirikkiri.domain.member.dto.LoginRequest;
import com.kkirikkiri.domain.member.dto.MemberInfo;
import com.kkirikkiri.domain.member.dto.RegisterRequest;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public Long registerMember(RegisterRequest registerRequest) {

        Optional<Member> checkMember = memberRepository.findByLoginId(registerRequest.getLoginId());
        if (checkMember.isPresent()) {
            throw new IllegalArgumentException("회원가입된 회원입니다. 로그인 해주세요.");
        }

        Member newMember = Member.builder()
                .loginId(registerRequest.getLoginId())
                .password(registerRequest.getPassword())
                .nickname(registerRequest.getNickname())
                .age(registerRequest.getAge())
                .level(registerRequest.getLevel())
                .thumbnail(registerRequest.getThumbnail())
                .build();
        memberRepository.save(newMember);

        return newMember.getId();
    }

    @Transactional(readOnly = true)
    public MemberInfo login(LoginRequest loginRequest) {
        Member member = memberRepository.findByLoginId(loginRequest.getLoginId())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        if (!Objects.equals(loginRequest.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return MemberInfo.builder()
                .loginId(member.getLoginId())
                .nickname(member.getNickname())
                .age(member.getAge())
                .level(member.getLevel())
                .thumbnail(member.getThumbnail())
                .build();
    }


    public MemberInfo getMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        Member member = optionalMember.get();

        MemberInfo memberInfo = MemberInfo.builder()
                    .id(member.getId())
                    .loginId(member.getLoginId())
                    .nickname(member.getNickname())
                    .age(member.getAge())
                    .level(member.getLevel())
                    .thumbnail(member.getThumbnail())
                    .build();

        return memberInfo;
    }
}