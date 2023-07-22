package com.widzard.bidking.member.dto.response;

import com.widzard.bidking.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateResponse {

    private Long id;

    public static UserCreateResponse from(Member savedMember) {
        return new UserCreateResponse(savedMember.getId());
    }
}
