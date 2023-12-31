package com.widzard.bidking.member.repository;

import com.widzard.bidking.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member save(Member member);

    boolean existsByUserId(String userId);

    boolean existsByNickname(String nickname);

    boolean existsByPhoneNumber(String phoneNumber);

    @Query("select m from Member m where m.userId = :userId and m.available = true ")
    Optional<Member> findByUserId(@Param("userId") String userId);

    @Query("select m from Member m where m.id = :memberId and m.available = true ")
    Optional<Member> findById(@Param("memberId") Long memberId);

}
