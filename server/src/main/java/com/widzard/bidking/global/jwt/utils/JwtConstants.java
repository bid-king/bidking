package com.widzard.bidking.global.jwt.utils;

public class JwtConstants {

    // Expiration Time
    public static final long MINUTE = 1000 * 60;
    public static final long HOUR = 60 * MINUTE;
    public static final long DAY = 24 * HOUR;
    public static final long MONTH = 30 * DAY;

    public static final long AT_EXP_TIME = 1 * MINUTE; // 엑세스 토큰 만료 시간
    public static final long RT_EXP_TIME = 10 * MINUTE; // 리프레시 토큰 만료 시간
    public static final String JWT_ISSUER = "ydajeong7@gmail.com";
    // Secret
    public static final String JWT_SECRET = "jwt_secret_key_53AMNLEWN4320732094870938DHFLKH32087YD0S887F09824309R09DSKFHLH32098409";

    // Header
    public static final String AT_HEADER = "access_token";
    public static final String RT_HEADER = "refresh_token";
    public static final String TOKEN_HEADER_PREFIX = "Bearer ";
}
