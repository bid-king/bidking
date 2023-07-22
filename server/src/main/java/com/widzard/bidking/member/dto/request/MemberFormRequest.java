package com.widzard.bidking.member.dto.request;

import com.widzard.bidking.global.entity.Address;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class MemberFormRequest {

    @NotBlank(message = "아이디를 입력해주세요.")
    private String userId;

    @NotBlank(message = "비밀번호를 입력해주세요") //TODO 비밀번호 형식 논의 필요
    @Length(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
    private String password; // 유저 패스워드

    @NotBlank(message = "휴대폰 본인 인증을 위해 휴대폰 번호를 입력해주세요.")
    private String phoneNumber; //( 핸드폰 번호 )

    //TODO
    private Address address; //( 기본배송지 )

}
