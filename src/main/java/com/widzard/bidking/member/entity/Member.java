package com.widzard.bidking.member.entity;



import com.widzard.bidking.common.entity.Address;
import com.widzard.bidking.common.entity.BaseEntity;
import com.widzard.bidking.image.entity.Image;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class Member extends BaseEntity {
    @Id
    @GeneratedValue()
    @Column(name = "member_code")
    private Long code; // 객체상 쓸 것
    private String name;
    private String nickName; //( 닉네임 )
    private String mobile; //( 핸드폰 번호 )
    @Embedded
    private Address address; //( 기본배송지 )
    private String gender; //( 성별 )
    private String birth; //( 생년월일 )
    private String email; //( 메일 )
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_code")
    private Image image; //( 프사 )
    private Boolean available; //( 상태 )
    @Enumerated
    private MemberRole memberRole; //(역할)



}
