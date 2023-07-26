package com.widzard.bidking.member.dto.request;

import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.global.validation.NotEmptyIfPresent;
import com.widzard.bidking.image.entity.Image;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class MemberUpdateRequest {

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Length(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
    private String oldPassword;

    @NotEmptyIfPresent(message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
    private String newPassword;

    @NotNull(message = "아이디를 입력해주세요.")
    private String nickname;

    @NotNull(message = "휴대폰 본인 인증을 위해 휴대폰 번호를 입력해주세요.")
    private String phoneNumber;

    private Address address;

    private Image image;
}
