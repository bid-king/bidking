package com.widzard.bidking.member.dto.request;

import javax.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UserNicknameRequest {

    @NotBlank(message = "닉네임을 입력해주세요.")
    private String nickname;
}
