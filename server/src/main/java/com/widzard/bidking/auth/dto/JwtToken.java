package com.widzard.bidking.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class JwtToken {

    private String grantType;
    private String accessToken;
    private String refreshToken;

    public JwtToken(String accessToken, String refreshToken) {
        this.grantType = "Bearer";
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
