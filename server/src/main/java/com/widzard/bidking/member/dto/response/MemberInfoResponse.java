package com.widzard.bidking.member.dto.response;

import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.member.entity.Member;
import java.util.Optional;
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

    private String userId;

    private String nickname;

    private String phoneNumber;

    private Address address;

    private String imageUrl;

    private int penalty;

    public static MemberInfoResponse from(Member member) {
        String imgPath = Optional.ofNullable(member.getImage())
            .map(Image::getFilePath)
            .orElse("");

        return MemberInfoResponse.builder()
            .userId(member.getUserId())
            .nickname(member.getNickname())
            .phoneNumber(member.getPhoneNumber())
            .address(member.getAddress())
            .imageUrl(imgPath)
            .build();
    }

}
