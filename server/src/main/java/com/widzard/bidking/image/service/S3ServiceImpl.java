package com.widzard.bidking.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.widzard.bidking.image.dto.ImageModifyDto;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.exception.ImageNotFoundException;
import com.widzard.bidking.image.repository.ImageRepository;
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
@Transactional
public class S3ServiceImpl implements ImageService {

    private final AmazonS3 amazonS3;
    private final ImageRepository imageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public List<Image> uploadImageList(MultipartFile[] multipartFileList)
        throws IOException {
        List<Image> imageList = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFileList) {

            String originalFilename = multipartFile.getOriginalFilename();
            String fileName = UUID.randomUUID() + "_" + originalFilename; // 파일 이름

            log.info("original file name: {}", originalFilename);

            long size = multipartFile.getSize(); // 파일 크기

            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);

            // S3에 업로드
            amazonS3.putObject(
                new PutObjectRequest(
                    bucket,
                    fileName,
                    multipartFile.getInputStream(),
                    objectMetaData
                ).withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String imagePath = amazonS3.getUrl(bucket, fileName).toString(); // 접근가능한 URL

            Image image = Image.builder()
                .filePath(imagePath)
                .originalFileName(originalFilename)
                .fileName(fileName)
                .build();

            imageRepository.save(image);

            imageList.add(image);
        }
        return imageList;
    }

    @Override
    public Image uploadImage(MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();
        String fileName = UUID.randomUUID() + "_" + originalFilename;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), metadata);
        String imagePath = amazonS3.getUrl(bucket, fileName).toString();

        Image image = Image.builder()
            .originalFileName(originalFilename)
            .fileName(fileName)
            .filePath(imagePath)
            .build();

        imageRepository.save(image);
        return image;
    }

    @Override
    public Image modifyImage(MultipartFile multipartFile, Long imageId) throws IOException {
        //S3업로드
        String originalFilename = multipartFile.getOriginalFilename();
        log.info("OfileName={}",originalFilename);
        String fileName = UUID.randomUUID() + "_" + originalFilename;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), metadata);
        String imagePath = amazonS3.getUrl(bucket, fileName).toString();

        //table 업데이트
        Image image = imageRepository.findById(imageId).orElseThrow(ImageNotFoundException::new);

        //S3 이미지 삭제
        amazonS3.deleteObject(bucket, image.getFileName());

        image.modify(new ImageModifyDto(originalFilename, fileName, imagePath));

        return image;
    }

    @Override
    public void deleteImage(Image image) {
        amazonS3.deleteObject(bucket, image.getFileName());
    }
}
