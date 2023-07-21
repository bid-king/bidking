package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomType;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemState;
import com.widzard.bidking.item.entity.repository.ItemRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
class AuctionServiceImplTest {

    @Autowired
    AuctionServiceImpl auctionService;
    @Autowired
    ItemRepository itemREpository;

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

        itemList.add(item);
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

        //when
        AuctionRoom auctionRoom = auctionService.createAuctionRoom(auctionCreateRequest);
        //then
        Boolean result = auctionRoom.equals(
            auctionService.readAuctionRoom(auctionRoom.getId()));

        Assertions.assertThat(result);

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