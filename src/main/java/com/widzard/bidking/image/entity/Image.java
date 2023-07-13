package com.widzard.bidking.image.entity;


import com.widzard.bidking.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_code")
    Long code;

    @OneToOne(mappedBy = "image", fetch = FetchType.LAZY)
    Member member;

    LocalDateTime createdAt;

    String fileName;

    String filePath;

}