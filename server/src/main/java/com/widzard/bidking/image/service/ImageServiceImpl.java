package com.widzard.bidking.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.entity.repository.ImageRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ImageServiceImpl implements ImageService {

    private final AmazonS3 amazonS3;
    private final ImageRepository imageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public List<String> uploadImageList(MultipartFile[] multipartFileList) throws IOException {
        List<String> imagePathList = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFileList) {

            String originalName =
                UUID.randomUUID() + "_" + multipartFile.getOriginalFilename(); // 파일 이름
            long size = multipartFile.getSize(); // 파일 크기

            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);

            // S3에 업로드
            amazonS3.putObject(
                new PutObjectRequest(bucket, originalName, multipartFile.getInputStream(),
                    objectMetaData)
                    .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String imagePath = amazonS3.getUrl(bucket, originalName)
                .toString(); // 접근가능한 URL
            imagePathList.add(imagePath);
            Image image = Image.builder()
                .filePath(imagePath)
//                .fileName() 필요 없을듯?
                .build();
            imageRepository.save(image);
        }
        return imagePathList;
    }

    @Override
    public String uploadImage(MultipartFile multipartFile) throws IOException {
        String originalName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, originalName, multipartFile.getInputStream(),
            metadata);
        String imagePath = amazonS3.getUrl(bucket, originalName).toString();
        Image image = Image.builder()
            .filePath(imagePath)
//                .fileName() 필요 없을듯?
            .build();
        imageRepository.save(image);

        return imagePath;
    }
}
