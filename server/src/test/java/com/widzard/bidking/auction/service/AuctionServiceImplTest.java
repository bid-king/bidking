package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.item.entity.Item;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class AuctionServiceImplTest {

    @Autowired
    AuctionServiceImpl a;

    @BeforeEach
    void data() {
        List<Item> itemList = new ArrayList<>();

        Item item = Item.builder()
            .id(1L)
            .name("아이패드22")

            .build();
    }

    @Test
    void create() {
        AuctionRoom ar = AuctionRoom.builder()
            .id(1L)
            .build();
//        AuctionCreateRequest req = new AuctionCreateRequest("title", "2023-07-23 12:12:12",
//            "GENERAL", "true", "true", "imageName");
//        Assertions.assertSame(ar, a.createAuctionRoom(req));
    }

}