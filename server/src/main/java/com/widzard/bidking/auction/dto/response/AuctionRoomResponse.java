package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.auction.entity.AuctionRoomType;
import java.time.LocalDateTime;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Builder;

@AllArgsConstructor
@Builder
public class AuctionRoomResponse {

    private Long id;//(경매방 id)

    // TODO 멤버 구현 후 추가
    private Long sellerId; //(판매자 Member id)

    private String name; //(방이름)


    private AuctionRoomLiveState auctionRoomLiveState; // (라이브 상태)

    //TODO auction room url 추가되면 추가
    private String auctionRoomUrl; //(auction room id)

    private AuctionRoomTradeState auctionRoomTradeState; //(거래 상태)

    private AuctionRoomType auctionRoomType; // (경매방식)

    private LocalDateTime startedAt; //경매방 시작시간

    private String imageURL; // (썸네일)

    private List<ItemDto> itemList = new ArrayList<>();//item 정보


}
