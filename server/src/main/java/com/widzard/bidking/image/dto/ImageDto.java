package com.widzard.bidking.image.dto;

import javax.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageDto {

    private Long id;

    @Column(nullable = false)
    private String originalFileName; // asd.jpg

    @Column(nullable = false, unique = true)
    private String fileName;

    @Column(nullable = false)
    private String filePath; // https: S3 주소/domain

}
