package com.widzard.bidking.member.entity;


import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.dto.request.MemberUpdateRequest;
import java.util.Collection;
import java.util.List;
import javax.persistence.CascadeType;
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
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Getter
@Builder
@ToString
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class Member extends BaseEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id; // 멤버 식별자

    @Column(nullable = false, length = 12, unique = true)
    private String userId; // 유저 아이디

    @Column(nullable = false, length = 60)
    private String password; // 유저 패스워드

    @Column(nullable = false, length = 10, unique = true)
    private String nickname; // 닉네임

    @Column(nullable = false, length = 11, unique = true)
    private String phoneNumber; // 핸드폰 번호

    @Embedded
    @Column(nullable = false)
    private Address address; // 기본배송지

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image; // 프로필 사진

    @Column(nullable = false, columnDefinition = "tinyint(1) default 1")
    private boolean available; // 활성화 여부 (탈퇴 시 false)

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'USER'")
    @Column(nullable = false, length = 10)
    private MemberRole memberRole; // 역할

    @Column(nullable = false)
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

    public void updateItem(MemberUpdateRequest request, String encodedPassword, Image image) {
        this.password = encodedPassword;
        this.nickname = request.getNickname();
        this.phoneNumber = request.getPhoneNumber();
        this.address = request.getAddress();
        if (image != null) {
            this.image = image;
        }
    }

    @Override

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(memberRole.name()));
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void changeToUnavailable() {
        this.available = false;
    }

    @Override
    public boolean equals(Object other) {
        if (other == null) {
            return false;
        }
        if (other == this) {
            return true;
        }
        if (!(other instanceof Member)) {
            return false;
        }
        Member otherCourse = (Member) other;
        return (otherCourse.id == this.id);
    }
}

