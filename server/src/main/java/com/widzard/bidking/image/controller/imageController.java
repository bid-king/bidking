package com.widzard.bidking.image.controller;

import com.widzard.bidking.image.service.ImageService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

//test용 컨트롤러
@RestController
@RequiredArgsConstructor
public class imageController {

    private final ImageService imageService;

    @GetMapping("/upload")
    public ResponseEntity<Object> upload(MultipartFile[] multipartFileList) throws Exception {
        if (multipartFileList == null) {
            throw new RuntimeException();
        }
        List<String> imagePathList = imageService.uploadImage(multipartFileList);
        return new ResponseEntity<Object>(imagePathList, HttpStatus.OK);
    }
}
