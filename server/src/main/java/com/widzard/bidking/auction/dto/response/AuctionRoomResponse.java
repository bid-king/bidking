package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.item.dto.ItemDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
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

    private Long sellerId; //(판매자 Member id)

    private String sellerNickname;//판매자 닉네임

    private String name; //(방이름)

    private String auctionRoomLiveState; // (라이브 상태)

    private String auctionRoomSesion;

    private String auctionRoomTradeState; //(거래 상태)

    private String auctionRoomType; // (경매방식)

    private LocalDateTime startedAt; //경매방 시작시간

    private String imageURL; // (썸네일)

    @Default
    private List<ItemDto> itemList = new ArrayList<>();


    public static AuctionRoomResponse from(AuctionRoom auctionRoom) {
        List<ItemDto> itemDtoList = auctionRoom.getItemList().stream()
            .map(ItemDto::create)
            .collect(Collectors.toList());

        AuctionRoomResponse result = AuctionRoomResponse.builder()
            .id(auctionRoom.getId())
            .sellerId(auctionRoom.getSeller().getId())
            .sellerNickname(auctionRoom.getSeller().getNickname())
            .auctionRoomLiveState(auctionRoom.getAuctionRoomLiveState().name())
            .auctionRoomTradeState(auctionRoom.getAuctionRoomTradeState().name())
            .name(auctionRoom.getName())
            .startedAt(auctionRoom.getStartedAt())
            .auctionRoomType(auctionRoom.getAuctionRoomType().name())
            .imageURL(auctionRoom.getImage().getFilePath())
            .itemList(itemDtoList)
            .build();

        return result;
    }
}
