package com.widzard.bidking.member.service;

import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberDuplicatedException;
import com.widzard.bidking.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    /*
     * 회원 가입
     */
    @Transactional
    @Override
    public Member signup(MemberFormRequest request) {
        validateDuplicatedMember(request);
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        Member member = Member.createMember(request, encodedPassword);
        return memberRepository.save(member);
    }

    /*
     * 아이디 중복 검사
     */
    @Override
    public boolean checkUserId(String userId) {
        return memberRepository.existsByUserId(userId);
    }

    /*
     * 닉네임 중복 검사
     */
    @Override
    public boolean checkNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    /*
     * 기존 회원 정보 확인
     * 유저 아이디 및 닉네임을 unique한 값으로 지정하였기 때문에 존재 여부로 이미 존재하는 회원인지를 판단하는 메서드
     * 회원가입 전에 유저 아이디, 유저 닉네임 검증 메서드가 있지만 최종 회원가입 시 한 번 더 검증해야 합니다.
     */
    private void validateDuplicatedMember(MemberFormRequest request) {
        if (checkUserId(request.getUserId()) || checkNickname(request.getNickname())) {
            throw new MemberDuplicatedException();
        }
    }
}
