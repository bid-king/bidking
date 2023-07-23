package com.widzard.bidking.global.security;

import com.widzard.bidking.global.jwt.service.TokenService;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final TokenService tokenService;

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
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // jwt 토큰 파싱
        jwt = authHeader.substring(7);
        log.info("JwtAuthenticationFilter is runnig... Token parsing Completed.");

        // jwt 토큰 검증 및 토큰으로부터 유저 정보 (UserId) 받아오기
        userId = tokenService.extractUsername(jwt);
        log.info("Token is valid...");




        ////////////////////////////////////////
//        String token = parseBearerToken(request);
//        log.info("JwtAuthenticationFilter is runnig...");
//        if (token != null && !token.equalsIgnoreCase("null")) {
//            Claims claims = tokenService.validateAndGetClaims(token);
//            log.info("token is valid...");
//
//            AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                "userId",
//                null,
//                AuthorityUtils.NO_AUTHORITIES
//            );
//            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
//            securityContext.setAuthentication(authentication);
//            SecurityContextHolder.setContext(securityContext);
//            filterChain.doFilter(request, response);
//        }
    }

    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
