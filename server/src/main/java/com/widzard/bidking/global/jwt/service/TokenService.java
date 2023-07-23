package com.widzard.bidking.global.jwt.service;

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
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class TokenService {

    private static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;
    protected static final String SECRET_KEY = "53AMNLEWN4320732094870938DHFLKH32087YD0S887F09824309R09DSKFHLH32098409"; //TODO System.getenv("JWT_SECRET")
    protected static final String issuer = "ydajeong7@gmail.com";
    private static final long TOKEN_DURATION = 2 * 60_000; // 2 minutes

    /*
     * subject에 저장된 userId 가져오는 메서드
     */
    public String extractUserId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /*
     * jwt 토큰 유효성 검증 및 토큰 기반으로 유저 claim 가져오는 메서드
     */
    public Claims validateAndGetClaims(String token) {
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
        final Claims claims = validateAndGetClaims(token);
        return claimsResolver.apply(claims);
    }

    /*
     * Extra Claims 없이 User Details만을 이용하여 token을 생성하는 메서드
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /*
     * Extra Claims들을 이용하여 token을 생성하는 메서드
     */
    public String generateToken(
        Map<String, Object> extraClaims,
        UserDetails userDetails
    ) {
        return Jwts
            .builder()
            .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
            .setIssuer(issuer)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + TOKEN_DURATION))
            .setSubject(userDetails.getUsername())
            .setClaims(extraClaims)
            .signWith(getKey(), SIGNATURE_ALGORITHM)
            .compact();
    }


    private Key getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }


}
