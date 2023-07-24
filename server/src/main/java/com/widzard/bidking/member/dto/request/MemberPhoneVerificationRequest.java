package com.widzard.bidking.member.dto.request;

import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MemberPhoneVerificationRequest {

    @NotBlank(message = "휴대폰 번호를 입력하세요")
    private String phoneNumber;
    
}
