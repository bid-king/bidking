package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.item.dto.ItemDto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Builder
@Slf4j
@Getter
@Setter
public class AuctionRoomResponse {

    private Long id;//(경매방 id)

    // TODO 멤버 구현 후 추가
    private Long sellerId; //(판매자 Member id)

    private String name; //(방이름)

    private String auctionRoomLiveState; // (라이브 상태)

    //TODO auction room url 추가되면 추가
    private String auctionRoomUrl; //(auction room id)

    private String auctionRoomTradeState; //(거래 상태)

    private String auctionRoomType; // (경매방식)

    private String startedAt; //경매방 시작시간

    private String imageURL; // (썸네일)

    private List<ItemDto> itemList = new ArrayList<>();


    public static AuctionRoomResponse create(AuctionRoom auctionRoom) {
        List<ItemDto> itemDtoList = auctionRoom.getItemList().stream()
            .map(item -> ItemDto.create(item))
            .collect(Collectors.toList());
        
        AuctionRoomResponse result = AuctionRoomResponse.builder()
            .id(auctionRoom.getId())
//            .sellerId(auctionRoom.getSeller.getId()) //TODO member 추가 후 주석 해제
            .auctionRoomLiveState(auctionRoom.getAuctionRoomLiveState().name())
            .auctionRoomTradeState(auctionRoom.getAuctionRoomTradeState().name())
//            .auctionRoomUrl(auctionRoom.getAuctionRoomURL)//TODO auctionRoomURL 추가 후 추가
            .name(auctionRoom.getName())
            .startedAt(auctionRoom.getStartedAt())
            .auctionRoomType(auctionRoom.getAuctionRoomType().name())
//            .imageURL(auctionRoom.getImage()) //TODO 이미지 추가 된 후 추가
            .itemList(itemDtoList)

            .build();
        return result;
    }
}
