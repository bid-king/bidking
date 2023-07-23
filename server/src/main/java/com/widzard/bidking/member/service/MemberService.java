package com.widzard.bidking.member.service;

import com.widzard.bidking.member.entity.Member;
import java.util.Optional;

public interface MemberService {

    Optional<Member> getUserDetail(Long userId);

}
