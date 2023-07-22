package com.widzard.bidking.member.service;

import com.widzard.bidking.global.exception.ErrorCode;
import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberDuplicatedException;
import com.widzard.bidking.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Member signup(MemberFormRequest request) {
        validateDuplicatedMember(request.getUserId());
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        Member member = Member.createMember(request, encodedPassword);
        return memberRepository.save(member);
    }
    // 아이디 중복 검사
    // 휴대폰 인증
    // 기존 회원 정보 확인
    private void validateDuplicatedMember(String userId) {
        Member findMember = memberRepository.findByUserId(userId);
        if (findMember != null) {
            throw new MemberDuplicatedException();
        }
    }
}
