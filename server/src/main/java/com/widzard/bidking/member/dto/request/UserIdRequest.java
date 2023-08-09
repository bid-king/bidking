package com.widzard.bidking.member.dto.request;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class UserIdRequest {

    @NotBlank(message = "아이디를 입력해주세요.")
    @Length(min = 4, max = 12, message = "아이디는 4자 이상, 12자 이하로 입력해주세요.")
    private String userId;

}
