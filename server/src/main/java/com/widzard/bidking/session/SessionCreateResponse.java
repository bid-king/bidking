package com.widzard.bidking.session;

import com.widzard.bidking.auction.dto.response.AuctionRoomResponse;
import com.widzard.bidking.item.dto.ItemDto;
import com.widzard.bidking.member.entity.Member;
import java.util.List;
import lombok.Getter;

@Getter
public class SessionCreateResponse extends AuctionRoomResponse {

    private String auctionRoomSession;

    private Member seller;

    public SessionCreateResponse(Long id, Long sellerId, String name, String auctionRoomLiveState,
        String auctionRoomUrl, String auctionRoomTradeState, String auctionRoomType,
        String startedAt,
        String imageURL, List<ItemDto> itemList) {
        super(id, sellerId, name, auctionRoomLiveState, auctionRoomUrl, auctionRoomTradeState,
            auctionRoomType, startedAt, imageURL, itemList);
    }
}
