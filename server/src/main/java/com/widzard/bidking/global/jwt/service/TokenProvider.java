package com.widzard.bidking.global.jwt.service;

import static com.widzard.bidking.global.jwt.utils.JwtConstants.AT_EXP_TIME;
import static com.widzard.bidking.global.jwt.utils.JwtConstants.ISSUER;
import static com.widzard.bidking.global.jwt.utils.JwtConstants.JWT_SECRET;
import static com.widzard.bidking.global.jwt.utils.JwtConstants.RT_EXP_TIME;
import static com.widzard.bidking.global.jwt.utils.JwtConstants.SIGNATURE_ALGORITHM;

import com.widzard.bidking.global.jwt.exception.InvalidTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class TokenProvider {

    /*
     * subject에 저장된 userId 가져오는 메서드
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /*
     * jwt 토큰 유효성 검증 및 토큰 기반으로 유저 claim 가져오는 메서드
     */
    public Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        } catch (JwtException e) {
            throw new InvalidTokenException();
        }
    }

    /*
     * 단일 claim 정보 가져오는 메서드
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /*
     * 토큰 검증 메서드
     *
     * 1. 토큰 내 유저 정보 일치 여부
     * 2. 토큰 만료 기간 검증
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && isTokenNotExpired(token));
    }

    /*
     * 토큰 만료 기간 검증 메서드
     */
    private boolean isTokenNotExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /*
     * 토큰에 기록된 만료기간 추출 메서드
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    /*
     * Extra Claims 없이 User Details을 이용하여 access token을 생성하는 메서드
     */
    public String generateAccessToken(UserDetails userDetails) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + AT_EXP_TIME);

        return Jwts
            .builder()
            .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
            .setIssuer(ISSUER)
            .setIssuedAt(now)
            .setExpiration(validity)
            .setSubject(userDetails.getUsername())
            .claim("userId", userDetails.getUsername())
            .claim("role", userDetails.getAuthorities())
            .signWith(getKey(), SIGNATURE_ALGORITHM)
            .compact();
    }

    /*
     * refresh token 생성 (현재 적용x)
     */
    public String generateRefreshToken() {
        Date now = new Date();
        Date validity = new Date(now.getTime() + RT_EXP_TIME);

        return Jwts.builder()
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(getKey())
            .compact();
    }

    /*
     * jwt 시크릿키 받아오는 메서드
     */

    private Key getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_SECRET));
    }


}
