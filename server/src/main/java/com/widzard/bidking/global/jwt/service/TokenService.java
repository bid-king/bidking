package com.widzard.bidking.global.jwt.service;

import com.widzard.bidking.global.jwt.exception.InvalidTokenException;
import com.widzard.bidking.member.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.Duration;
import java.util.Date;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class TokenService {

    private static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;
    protected static final Key SECRET_KEY = Keys.hmacShaKeyFor(
        Decoders.BASE64.decode("adfddfafdssssssssssssssssssssssssssssssssssssssssssssssssssssssssdsafadsfadsdfs")); //TODO System.getenv("JWT_SECRET")

    protected static final String issuer = "ydajeong7@gmail.com";

    private static final long TOKEN_DURATION = 2 * 60_000; // 2 minutes


    /*
     * jwt 토큰 유효성 검증 및 토큰 기반으로 유저 claim 가져오는 메서드
     */
    public Claims validateAndGetClaims(String token) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        } catch (JwtException e) {
            throw new InvalidTokenException();
        }
    }

    public String generateToken(Member member, Duration expiredAt) {
        Date now = new Date();
        return makeToken(member, new Date(System.currentTimeMillis() + TOKEN_DURATION));
    }

    private String makeToken(Member member, Date expiration) {
        return Jwts.builder()
            .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
            .setIssuer(issuer)
            .setIssuedAt(new Date())
            .setExpiration(expiration)
            .setSubject(member.getUserId())
            .claim("userId", member.getUserId())
            .signWith(SECRET_KEY, SIGNATURE_ALGORITHM)
            .compact();
    }





}
