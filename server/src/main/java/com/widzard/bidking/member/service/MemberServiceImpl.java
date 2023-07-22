package com.widzard.bidking.member.service;

import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberDuplicatedException;
import com.widzard.bidking.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    /*
     * 회원 가입
     */
    @Override
    public Member signup(MemberFormRequest request) {
        validateDuplicatedMember(request.getUserId());
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
     * 기존 회원 정보 확인
     * 유저 아이디를 unique한 값으로 지정하였기 때문에 userId 존재 여부로 이미 존재하는 회원인지를 판단하는 메서드
     * api 분리와 exception / response 처리를 위해 별도의 메서드로 분리하였습니다.
     */
    private void validateDuplicatedMember(String userId) {
        if (memberRepository.existsByUserId(userId)) {
            throw new MemberDuplicatedException();
        }
    }
}
