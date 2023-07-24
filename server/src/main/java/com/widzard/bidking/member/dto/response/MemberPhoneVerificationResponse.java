package com.widzard.bidking.member.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MemberPhoneVerificationResponse {

    private String certifiedNumber;

    public static MemberPhoneVerificationResponse createResponse(String certifiedNumber) {
        return new MemberPhoneVerificationResponse(certifiedNumber);
    }
}
