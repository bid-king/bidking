package com.widzard.bidking.image.entity;


import com.widzard.bidking.common.entity.BaseEntity;
import com.widzard.bidking.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "image")
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_code")
    Long code;

    @OneToOne(mappedBy = "image", fetch = FetchType.LAZY)
    Member member;

    String fileName;

    String filePath;

}