package com.widzard.bidking.image.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
public class ImageModifyDto {
    private Long id;

    private String originalFileName; // asd.jpg

    private String fileName;

    private String filePath; // https: S3 주소

    public ImageModifyDto(String originalFileName, String fileName, String filePath) {
        this.originalFileName = originalFileName;
        this.fileName = fileName;
        this.filePath = filePath;
    }
}
