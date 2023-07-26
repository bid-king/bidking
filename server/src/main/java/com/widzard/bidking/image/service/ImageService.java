package com.widzard.bidking.image.service;

import com.widzard.bidking.image.entity.Image;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {


    //파일 리스트 업로드
    List<Image> uploadImageList(MultipartFile[] multipartFileList)
        throws IOException;

    Image uploadImage(MultipartFile multipartFile) throws IOException;

    void deleteImage(Image image);

}
