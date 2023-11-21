package com.widzard.bidking.member.repository;

import com.widzard.bidking.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByUserId(String userId);

    boolean existsByNickname(String nickname);

    boolean existsByPhoneNumber(String phoneNumber);

    Optional<Member> findByUserIdAndAvailableTrue(@Param("userId") String userId);

    Optional<Member> findByIdAndAvailableTrue(@Param("memberId") Long memberId);
}

