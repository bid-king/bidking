package com.widzard.bidking.member.repository;

import com.widzard.bidking.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Long, Member> {

    Member findByUserId(String userId);

    Member save(Member member);
}
