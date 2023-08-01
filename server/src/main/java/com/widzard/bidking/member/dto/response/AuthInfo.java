package com.widzard.bidking.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthInfo {

    private Long id;
    private String token;
}
