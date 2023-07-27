package com.widzard.bidking.member.dto.request;

import javax.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UserIdRequest {

    @NotBlank(message = "아이디를 입력해주세요.")
    private String userId;

}
