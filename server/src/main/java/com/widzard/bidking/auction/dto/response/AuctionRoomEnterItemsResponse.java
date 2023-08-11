package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.entity.AuctionRoom;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRoomEnterItemsResponse {

    private Long currentItemId;
    private List<AuctionItemResponse> itemList;

    public static AuctionRoomEnterItemsResponse from(AuctionRoom auctionRoom) {
        return new AuctionRoomEnterItemsResponse(
            auctionRoom.getItemList().get(0).getId(),
            auctionRoom.getItemList()
                .stream()
                .map(AuctionItemResponse::from)
                .collect(Collectors.toList())
        );
    }
}
