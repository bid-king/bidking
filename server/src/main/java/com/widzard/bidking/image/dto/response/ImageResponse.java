package com.widzard.bidking.image.dto.response;

import com.widzard.bidking.image.entity.Image;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class ImageResponse {

    private String fileName;

    private String filePath;

    public static ImageResponse createResponse(Image image) {
        return ImageResponse.builder()
            .fileName(image.getFileName())
            .filePath(image.getFilePath())
            .build();
    }

}
