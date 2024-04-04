package com.kkirikkiri.domain.member.service;

import com.kkirikkiri.domain.member.dto.LoginRequest;
import com.kkirikkiri.domain.member.dto.MemberInfo;
import com.kkirikkiri.domain.member.dto.RegisterRequest;
import com.kkirikkiri.domain.member.dto.UpdateInfoRequest;
import com.kkirikkiri.domain.member.entity.Member;
import com.kkirikkiri.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public Long registerMember(RegisterRequest registerRequest) {
        if (memberRepository.existsByLoginId(registerRequest.getLoginId())) {
            throw new IllegalArgumentException("회원가입된 회원입니다. 로그인해주세요.");
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
                .id(member.getId())
                .loginId(member.getLoginId())
                .nickname(member.getNickname())
                .age(member.getAge())
                .level(member.getLevel())
                .thumbnail(member.getThumbnail())
                .build();
    }


    public MemberInfo getMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        return MemberInfo.builder()
                .id(member.getId())
                .loginId(member.getLoginId())
                .nickname(member.getNickname())
                .age(member.getAge())
                .level(member.getLevel())
                .thumbnail(member.getThumbnail())
                .build();

    }

    public String modifyMember(Long memberId, UpdateInfoRequest updateInfoRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        if (!Objects.equals(updateInfoRequest.getNickname(), member.getNickname()) &&
                checkNickname(updateInfoRequest.getNickname())) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }

        Member updatedMember = Member.builder()
                .id(member.getId())
                .loginId(member.getLoginId())
                .password(updateInfoRequest.getPassword())
                .nickname(updateInfoRequest.getNickname())
                .thumbnail(updateInfoRequest.getThumbnail())
                .level(updateInfoRequest.getLevel())
                .age(updateInfoRequest.getAge())
                .build();

        memberRepository.save(updatedMember);

        return "수정이 완료됐어요!";
    }

    public String deleteMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));
        try {
            memberRepository.deleteById(memberId);
        } catch (Exception e) {
            throw new IllegalArgumentException("회원 탈퇴에 실패했습니다.");
        }
        return "회원 탈퇴가 완료됐습니다.";
    }

    public Boolean checkLoginId(String loginId) {
        return memberRepository.existsByLoginId(loginId);
    }

    public Boolean checkNickname(String nickName) {
        return memberRepository.existsByNickname(nickName);
    }

}
