package com.widzard.bidking.member.service;

import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;
import com.widzard.bidking.member.dto.request.MemberUpdateRequest;
import com.widzard.bidking.member.dto.response.AuthInfo;
import com.widzard.bidking.member.entity.Member;
import java.io.IOException;
import java.util.HashMap;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    Member signup(MemberFormRequest request);

    boolean checkUserId(String userId);

    boolean checkNickname(String nickname);

    boolean checkPhoneNumber(String phoneNumber);

    AuthInfo login(MemberLoginRequest request);

    void certifiedPhoneNumber(String phoneNumber, String cerNum);

    Member getUserDetail(Long userId);

    HashMap<String, Integer> getUserDashboard(Long userId);

    HashMap<String, Integer> getSellerDashboard(Long userId);

    void updateMember(Long memberId, MemberUpdateRequest request, MultipartFile image)
        throws IOException;

    void deleteMember(Long userId);

}
