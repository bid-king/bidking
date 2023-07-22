package com.widzard.bidking.member.entity;


import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.member.dto.request.MemberFormRequest;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id; // 멤버 식별자

    @Column(unique = true, nullable = false)
    private String userId; // 유저 아이디

    @Column(nullable = false)
    private String password; // 유저 패스워드

    @Column(unique = true, nullable = false)
    private String nickname; // 닉네임

    private String phoneNumber; // 핸드폰 번호

    @Embedded
    private Address address; // 기본배송지

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image image; // 프로필 사진

    private boolean available; // 활성화 여부 (탈퇴 시 false)

    @Enumerated(EnumType.STRING)
    private MemberRole memberRole; // 역할

    private int penalty;

    public static Member createMember(MemberFormRequest request, String encodedPassword) {
        return Member.builder()
            .userId(request.getUserId())
            .nickname(request.getNickname())
            .password(encodedPassword)
            .address(request.getAddress())
            .phoneNumber(request.getPhoneNumber())
            .memberRole(MemberRole.USER)
            .available(true)
            .build();
    }
}
