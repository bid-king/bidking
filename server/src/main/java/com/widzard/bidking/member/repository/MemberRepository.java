package com.widzard.bidking.member.repository;

import com.widzard.bidking.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
