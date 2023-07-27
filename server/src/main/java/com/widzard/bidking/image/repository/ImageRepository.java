package com.widzard.bidking.image.repository;

import com.widzard.bidking.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
