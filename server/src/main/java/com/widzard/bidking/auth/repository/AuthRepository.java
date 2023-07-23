package com.widzard.bidking.auth.repository;

import com.widzard.bidking.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<Member, Long> {

    // 추후 별도 도메인으로 분리
    Optional<Member> findByUserId(String userId);

}
