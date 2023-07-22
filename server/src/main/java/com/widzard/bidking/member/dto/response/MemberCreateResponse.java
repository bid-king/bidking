package com.widzard.bidking.member.dto.response;

import com.widzard.bidking.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberCreateResponse {

    private Long id;

    public static MemberCreateResponse from(Member savedMember) {
        return new MemberCreateResponse(savedMember.getId());
    }
}
