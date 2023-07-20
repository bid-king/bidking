package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.response.AuctionCreateResponse;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomType;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemState;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class AuctionServiceImplTest {

    @Autowired
    AuctionServiceImpl auctionService;

    private List<Item> itemList = new ArrayList<>();
    private Item item = new Item();

    @BeforeEach
    void setUp() {
        itemList = new ArrayList<>();

        Item item = Item.builder()
            .id(1L)
            .name("아이패드22")
            .itemState(ItemState.SUCCESS)
            .ordering(1)
            .startPrice(22222L)
            .build();
    }


    @Test
    @DisplayName("성공 케이스")
    void Success() {
        //given
        AuctionCreateRequest auctionCreateRequest = AuctionCreateRequest.builder()
            .auctionTitle("title")
            .startedAt(LocalDateTime.now().plusHours(5))
            .auctionRoomType(AuctionRoomType.GENERAL)
            .itemPermissionChecked(true)
            .deliveryRulesChecked(true)
            .imageName("image")
            .itemList(itemList)
            .build();

        AuctionCreateResponse auctionCreateResponse1 = AuctionCreateResponse.builder()
            .id(1L)
            .build();

        //when
        AuctionRoom result1 = auctionService.createAuctionRoom(auctionCreateRequest);
        //then
        Assertions.assertThat(result1.getId()).isEqualTo(auctionCreateResponse1.getId());

    }

    @Test
    @DisplayName("시작시간 에러 케이스")
    void auctionStartTimeInvalidException() {
        //given
        AuctionCreateRequest auctionCreateRequest = AuctionCreateRequest.builder()
            .auctionTitle("title")
            .startedAt(LocalDateTime.now())
            .auctionRoomType(AuctionRoomType.GENERAL)
            .itemPermissionChecked(true)
            .deliveryRulesChecked(true)
            .imageName("image")
            .itemList(itemList)
            .build();

        //when,then
        Assertions.assertThatThrownBy(() -> auctionService.createAuctionRoom(auctionCreateRequest))
            .isInstanceOf(AuctionStartTimeInvalidException.class);

    }

}