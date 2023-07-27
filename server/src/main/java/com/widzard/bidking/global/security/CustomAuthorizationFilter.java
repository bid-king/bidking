package com.widzard.bidking.global.security;

import static com.widzard.bidking.global.jwt.utils.JwtConstants.TOKEN_HEADER_PREFIX;

import com.widzard.bidking.global.jwt.service.TokenProvider;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthorizationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String jwt;
        final String userId;

        // Authorization header 및 Bearer 형식 체크
        final String authHeader = request.getHeader("Authorization");
        log.info("authHeader: " + authHeader);
        if (authHeader == null || !authHeader.startsWith(TOKEN_HEADER_PREFIX)) {
            log.info("Authorization header가 없거나 grant type 형식이 맞지 않습니다.");
            filterChain.doFilter(request, response);
            return;
        }

        // jwt 토큰 파싱
        jwt = authHeader.substring(7);
        log.info("JwtAuthenticationFilter is runnig... Token parsing Completed.");

        // jwt 토큰 검증 및 토큰으로부터 유저 정보 (UserId) 받아오기
        userId = tokenProvider.extractUsername(jwt);
        log.info("{}, extract userId from jwt", userId);

        // 미인증 상태이며 토큰 내 유저 정보가 존재할 때 db에서 user details를 가져와 체크
        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

        // 토큰 검증
        if (!tokenProvider.isTokenExpired(jwt)) {
            // 토큰이 유효하면 UsernamePasswordAuthenticationToken 생성
            log.info("Token is valid...");
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                jwt,
                userDetails.getAuthorities()
            );

            authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
            );

            // security context holder에 인증 정보 기록
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        }

    }
}
