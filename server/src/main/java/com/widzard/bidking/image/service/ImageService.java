package com.widzard.bidking.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {


    //파일 리스트 업로드
    public void uploadImage(MultipartFile[] multipartFileList);

}
