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
import org.springframework.web.bind.annotation.RequestBody;

import java.util.NoSuchElementException;
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

    public String modifyMember(Long id, UpdateInfoRequest updateInfoRequest) {
        Optional<Member> optionalMember = memberRepository.findById(id); // 기존 데베에 있는 회원정보 가져오기

        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            member.setPassword(updateInfoRequest.getPassword());
            member.setNickname(updateInfoRequest.getNickname());
            member.setThumbnail(updateInfoRequest.getThumbnail());
            member.setLevel(updateInfoRequest.getLevel());

            return member.getNickname();
        } else {
            throw new IllegalArgumentException("회원정보 수정에 실패했습니다.");
        }
    }

    public Long deleteMember(Long id) {
        Optional<Member> optionalMember = memberRepository.findById(id); // 기존 데베에 있는 회원정보 가져오기

        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            return member.getId();
        } else {
            throw new IllegalArgumentException("회원 탈퇴에 실패했습니다.");
        }
    }

    public Boolean checkLoginId(String loginId) {
        return memberRepository.existsByLoginId(loginId);
    }

    public Boolean checkNickname(String nickName) {
        return memberRepository.existsByNickname(nickName);
    }

}
