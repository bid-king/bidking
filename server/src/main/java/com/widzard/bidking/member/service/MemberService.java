package com.widzard.bidking.member.service;

import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;
import com.widzard.bidking.member.entity.Member;
import java.util.HashMap;

public interface MemberService {

    Member signup(MemberFormRequest request);

    boolean checkUserId(String userId);

    boolean checkNickname(String nickname);

    boolean checkPhoneNumber(String phoneNumber);

    String login(MemberLoginRequest request);

    void certifiedPhoneNumber(String phoneNumber, String cerNum);

    Member getUserDetail(Long userId);

    HashMap<String, Integer> getUserDashboard(Long userId);

    HashMap<String, Integer> getSellerDashboard(Long userId);

}
