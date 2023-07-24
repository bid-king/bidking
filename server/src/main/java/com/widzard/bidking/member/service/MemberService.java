package com.widzard.bidking.member.service;

import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;
import com.widzard.bidking.member.entity.Member;

public interface MemberService {

    Member signup(MemberFormRequest entity);

    boolean checkUserId(String userId);

    boolean checkNickname(String nickname);

    String login(MemberLoginRequest request);

}

