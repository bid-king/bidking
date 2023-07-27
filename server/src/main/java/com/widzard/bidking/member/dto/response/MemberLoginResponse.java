package com.widzard.bidking.member.dto.response;

import static com.widzard.bidking.global.jwt.utils.JwtConstants.TOKEN_HEADER_PREFIX;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class MemberLoginResponse {

    private String grantType;
    private String accessToken;

    public static MemberLoginResponse from(String token) {
        return new MemberLoginResponse(TOKEN_HEADER_PREFIX, token);
    }
}
