package com.widzard.bidking.member.dto.request;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class UserNicknameRequest {

    @NotBlank(message = "닉네임을 입력해주세요.")
    @Length(min = 2, max = 12, message = "닉네임은 2자 이상, 12자 이하로 입력해주세요.")
    private String nickname;
}
