package com.widzard.bidking.member.repository;

import com.widzard.bidking.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member save(Member member);

    boolean existsByUserId(String userId);

    boolean existsByNickname(String nickname);
}
