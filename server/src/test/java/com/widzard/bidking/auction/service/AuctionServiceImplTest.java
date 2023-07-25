package com.widzard.bidking.auction.service;

import static org.junit.jupiter.api.Assertions.*;

import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.entity.repository.ImageRepository;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.entity.MemberRole;
import com.widzard.bidking.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
@RunWith(SpringRunner.class)
@Slf4j
class AuctionServiceImplTest {
    @Autowired
    AuctionService auctionService;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ImageRepository imageRepository;

    @BeforeEach
    private void basicSetting(){
        Image image = Image.builder()
            .fileName("tempImg")
            .filePath("temp/img/url")
            .build();

        Member member = Member.builder()
            .image(image)
            .memberRole(MemberRole.USER)
            .password("tempPw")
            .address(new Address("도도","리아","도도리아"))
            .available(true)
            .nickname("김닉넴")
            .penalty(0)
            .build();
        Member save = memberRepository.save(member);
        log.info("Save == befor {}",save==member);


    }

    @Test
    void createAuctionRoom() {

    }

    @Test
    void readAuctionRoom() {
    }

    @Test
    void updateAuctionRoom() {
    }
}