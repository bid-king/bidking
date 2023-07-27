package com.widzard.bidking.session;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.item.dto.ItemDto;
import com.widzard.bidking.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class SessionCreateResponse {

    private Long id;//(경매방 id)

    private String name; //(방이름)

    private String auctionRoomLiveState; // (라이브 상태)

    private String auctionRoomSesion;

    private String auctionRoomTradeState; //(거래 상태)

    private String auctionRoomType; // (경매방식)

    private String startedAt; //경매방 시작시간

    private String imageURL; // (썸네일)

    private List<ItemDto> itemList = new ArrayList<>();

    private String auctionRoomSession;

    private Member seller;

    public static SessionCreateResponse from(AuctionRoom auctionRoom, String auctionRoomSession,
        Member seller) {
        List<ItemDto> itemDtoList = auctionRoom.getItemList().stream()
            .map(ItemDto::create)
            .collect(Collectors.toList());

        SessionCreateResponse result = SessionCreateResponse.builder()
            .id(auctionRoom.getId())
            .auctionRoomLiveState(auctionRoom.getAuctionRoomLiveState().name())
            .auctionRoomTradeState(auctionRoom.getAuctionRoomTradeState().name())
            .name(auctionRoom.getName())
            .startedAt(auctionRoom.getStartedAt())
            .auctionRoomType(auctionRoom.getAuctionRoomType().name())
            .imageURL(auctionRoom.getImage().getFilePath())
            .itemList(itemDtoList)
            .auctionRoomSesion(auctionRoomSession)
            .seller(seller)
            .build();

        return result;
    }

}
