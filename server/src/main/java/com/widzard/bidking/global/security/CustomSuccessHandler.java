package com.widzard.bidking.global.security;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.widzard.bidking.auth.service.AuthService;
import com.widzard.bidking.global.jwt.service.TokenService;
import com.widzard.bidking.member.entity.Member;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler implements AuthenticationSuccessHandler {

    private static final String AT_HEADER = "access_token";
    private static final String RT_HEADER = "refresh_token";
    private final TokenService tokenService;
    private final AuthService authService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

        Member member = (Member) authentication.getPrincipal();

        String accessToken = tokenService.generateAccessToken(member);
        String refreshToken = tokenService.generateRefreshToken();

        // Refresh Token DB 저장
        authService.updateRefreshToken(member.getUserId(), refreshToken);

        // Access Token , Refresh Token 프론트 단에 Response Header로 전달
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("utf-8");
        response.setHeader(AT_HEADER, accessToken);
        response.setHeader(RT_HEADER, refreshToken);

        Map<String, String> responseMap = new HashMap<>();
        responseMap.put(AT_HEADER, accessToken);
        responseMap.put(RT_HEADER, refreshToken);
        new ObjectMapper().writeValue(response.getWriter(), responseMap);
    }
}
