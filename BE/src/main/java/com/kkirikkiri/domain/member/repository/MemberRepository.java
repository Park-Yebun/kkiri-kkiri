package com.kkirikkiri.domain.member.repository;

import com.kkirikkiri.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Override
    Optional<Member> findById(Long id);

    Optional<Member> findByLoginId(String loginId);

    @Override
    void deleteById(Long id);
}
