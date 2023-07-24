package com.widzard.bidking.global.jwt.utils;

import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;

public class JwtConstants {

    // Expiration Time
    public static final long MINUTE = 1000 * 60;
    public static final long HOUR = 60 * MINUTE;
    public static final long DAY = 24 * HOUR;
    public static final long MONTH = 30 * DAY;

    public static final long AT_EXP_TIME = 20 * MINUTE; // 엑세스 토큰 만료 시간
    public static final long RT_EXP_TIME = 7 * DAY; // 리프레시 토큰 만료 시간

    // Secret
    @Value("${jwt_secret}")
    public static String JWT_SECRET;

    @Value("${jwt_issuer}")
    public static String ISSUER;

    // Header
    public static final String AT_HEADER = "access_token";
    public static final String RT_HEADER = "refresh_token";
    public static final String TOKEN_HEADER_PREFIX = "Bearer ";

    public static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

}
