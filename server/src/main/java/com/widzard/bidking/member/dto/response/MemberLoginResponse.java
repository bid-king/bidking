package com.widzard.bidking.member.dto.response;

import static com.widzard.bidking.global.jwt.utils.JwtConstants.TOKEN_HEADER_PREFIX;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class MemberLoginResponse {

    private Long id;
    private String grantType;
    private String accessToken;

    public static MemberLoginResponse from(AuthInfo authInfo) {
        return new MemberLoginResponse(authInfo.getId(), TOKEN_HEADER_PREFIX, authInfo.getToken());
    }

}
