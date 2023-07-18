package com.widzard.bidking.oauth.entity;


import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "login_info_social")
public class LoginInfoSocial extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "login_info_social_id")
    Long id;

    @Enumerated(EnumType.STRING)
    SocialType socialType;

    String token;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    Member member;
}