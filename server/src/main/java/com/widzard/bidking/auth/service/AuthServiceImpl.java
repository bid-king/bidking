package com.widzard.bidking.auth.service;

import com.widzard.bidking.auth.dto.AuthInfo;
import com.widzard.bidking.auth.dto.JwtToken;
import com.widzard.bidking.auth.repository.AuthRepository;
import com.widzard.bidking.global.jwt.service.TokenService;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthRepository authRepository;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenService tokenService;

    @Override
    public JwtToken login(MemberLoginRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(request.getUserId(), request.getPassword());
        Authentication authentication = managerBuilder.getObject()
            .authenticate(authenticationToken);

        String accessToken = tokenService.generateAccessToken(
            (UserDetails) authentication.getPrincipal());
        String refreshToken = tokenService.generateRefreshToken();
        return new JwtToken(accessToken, refreshToken);
    }

    @Override
    public void updateRefreshToken(String userId, String refreshToken) {
        Member member = authRepository.findByUserId(userId)
            .orElseThrow(() -> new MemberNotFoundException());
        member.updateRefreshToken(refreshToken);
    }
}
