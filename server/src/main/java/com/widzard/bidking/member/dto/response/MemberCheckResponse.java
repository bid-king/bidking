package com.widzard.bidking.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberCheckResponse {
    private boolean isDuplicated;

    public static MemberCheckResponse from(boolean isDuplicated) {
        return new MemberCheckResponse(isDuplicated);
    }
}
