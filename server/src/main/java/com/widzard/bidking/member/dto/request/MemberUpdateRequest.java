package com.widzard.bidking.member.dto.request;

import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.image.entity.Image;
import lombok.Getter;

@Getter
public class MemberUpdateRequest {

    private String oldPassword;

    private String newPassword;

    private String nickname;

    private String phoneNumber;

    private Address address;

    private Image image;
}
