package com.widzard.bidking.auth.service;

import com.widzard.bidking.auth.dto.JwtToken;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;

public interface AuthService {

    JwtToken login(MemberLoginRequest request);

    void updateRefreshToken(String userId, String refreshToken);
}
