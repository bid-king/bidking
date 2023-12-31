package com.widzard.bidking.image.entity;


import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.image.dto.ImageModifyDto;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "image")
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @Column(nullable = false, length = 140)
    private String originalFileName; // asd.jpg

    @Column(nullable = false, unique = true)
    private String fileName;

    @Column(nullable = false, unique = true)
    private String filePath; // https: S3 주소/fileName


    public void modify(ImageModifyDto imageModifyDto) {
        this.originalFileName = imageModifyDto.getOriginalFileName();
        this.fileName = imageModifyDto.getFileName();
        this.filePath = imageModifyDto.getFilePath();
    }
}