package com.widzard.bidking.member.dto.request;

import com.widzard.bidking.global.entity.Address;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class MemberFormRequest {

    @NotBlank(message = "아이디를 입력해주세요.")
    @Length(min = 4, max = 12, message = "아이디는 4자 이상, 12자 이하로 입력해주세요.")
    private String userId;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Length(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
    private String password; // 유저 패스워드

    @NotBlank(message = "닉네임을 입력해주세요.")
    @Length(min = 2, max = 12, message = "닉네임은 2자 이상, 12자 이하로 입력해주세요.")
    private String nickname;

    @NotBlank(message = "휴대폰 본인 인증을 위해 휴대폰 번호를 입력해주세요.")
    private String phoneNumber; //( 핸드폰 번호 )

    @NotNull(message = "주소를 입력해주세요.")
    private Address address; // ( 기본배송지 )
}
