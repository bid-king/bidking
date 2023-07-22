package com.widzard.bidking.image.service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {


    //파일 리스트 업로드
    public List<String> uploadImageList(MultipartFile[] multipartFileList) throws IOException;

    public String uploadImage(MultipartFile multipartFile) throws IOException;

}
