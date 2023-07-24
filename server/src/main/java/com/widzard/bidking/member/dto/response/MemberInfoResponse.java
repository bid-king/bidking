package com.widzard.bidking.member.dto.response;

import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.member.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class MemberInfoResponse {

    private String name;

    private String nickname;

    private String phoneNumber;

    private String email;

    private Address address;

    private ImageResponse image;

    public static MemberInfoResponse createResponse(Member member) {
        return MemberInfoResponse.builder()
            .name(member.getName())
            .nickname(member.getNickname())
            .phoneNumber(member.getPhoneNumber())
            .address(member.getAddress())
            .image(ImageResponse.createResponse(member.getImage()))
            .build();
    }
}
