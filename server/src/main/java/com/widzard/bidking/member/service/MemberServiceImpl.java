package com.widzard.bidking.member.service;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Optional<Member> getUserDetail(Long userId) {
        return memberRepository.findById(userId);
    }
}
