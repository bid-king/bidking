package com.widzard.bidking.member.dto.response;

import com.widzard.bidking.image.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ImageResponse {

    private String fileName;

    private String filePath;

    public static ImageResponse createResponse(Image image) {
        return new ImageResponse(image.getFileName(), image.getFilePath());
    }
}
