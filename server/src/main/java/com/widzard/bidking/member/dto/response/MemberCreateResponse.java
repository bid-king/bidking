package com.widzard.bidking.member.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

/*
 * Test Response
 */
@Getter
@NoArgsConstructor
public class MemberCreateResponse {
    private Long id;

    public MemberCreateResponse(Long id) {
        this.id = id;
    }
}
