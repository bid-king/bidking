package com.widzard.bidking.oauth.entity;


import com.widzard.bidking.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "login_info_social")
public class LoginInfoSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "login_info_social_code")
    Long code;

    @Enumerated(EnumType.STRING)
    SocialType socialType;

    String token;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code")
    Member member;
}