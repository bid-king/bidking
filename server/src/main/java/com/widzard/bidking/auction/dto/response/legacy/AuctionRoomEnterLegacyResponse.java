package com.widzard.bidking.auction.dto.response.legacy;

import com.widzard.bidking.auction.dto.response.AuctionItemResponse;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomType;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRoomEnterLegacyResponse {

    private Long auctionRoomId;
    private String nickname;
    private AuctionRoomType auctionRoomType;
    private String title;
    private Long currentItemId;
    private List<AuctionItemResponse> itemList;

    public static AuctionRoomEnterLegacyResponse from(AuctionRoom auctionRoom) {
        return new AuctionRoomEnterLegacyResponse(
            auctionRoom.getId(),
            auctionRoom.getSeller().getNickname(),
            auctionRoom.getAuctionRoomType(),
            auctionRoom.getName(),
            auctionRoom.getItemList().get(0).getId(),
            auctionRoom.getItemList()
                .stream()
                .map(AuctionItemResponse::from)
                .collect(Collectors.toList())
        );
    }
}
