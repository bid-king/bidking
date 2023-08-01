package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.item.dto.ItemSellerDto;
import com.widzard.bidking.orderItem.entity.OrderItem;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuctionRoomSellerResponse {
    private Long id;//(경매방 id)

    private Long sellerId; //(판매자 Member id)

    private String name; //(방이름)

    private String startedAt; //경매방 시작시간

    private String auctionRoomLiveState; // (라이브 상태)

    private String auctionRoomType; // (경매방식)

    private String sellerNickname;//판매자 닉네임

    private String imageURL; // (썸네일)

    private String auctionRoomSesion;

    private List<ItemSellerDto> itemList = new ArrayList<>();

    public static AuctionRoomSellerResponse from(AuctionRoom auctionRoom, List<OrderItem> orderItemList ) {
        List<ItemSellerDto> itemSellerDtoList = orderItemList.stream()
            .map(ItemSellerDto::create)
            .collect(Collectors.toList());

        AuctionRoomSellerResponse result = AuctionRoomSellerResponse.builder()
            .id(auctionRoom.getId())
            .sellerId(auctionRoom.getSeller().getId())
            .sellerNickname(auctionRoom.getSeller().getNickname())
            .auctionRoomLiveState(auctionRoom.getAuctionRoomLiveState().name())
            .name(auctionRoom.getName())
            .startedAt(auctionRoom.getStartedAt())
            .auctionRoomType(auctionRoom.getAuctionRoomType().name())
            .imageURL(auctionRoom.getImage().getFilePath())
            .itemList(itemSellerDtoList)
            .build();

        return result;
    }
}
