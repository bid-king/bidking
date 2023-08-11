package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.dto.AuctionRoomEnterDto;
import com.widzard.bidking.auction.entity.AuctionRoomType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRoomEnterResponse {

    private boolean isSeller;
    private Long auctionRoomId;
    private String nickname; // 방 들어온 사람 id
    private AuctionRoomType auctionRoomType;
    private String title;

    public static AuctionRoomEnterResponse from(AuctionRoomEnterDto dto) {
        return new AuctionRoomEnterResponse(
            dto.isSeller(),
            dto.getAuctionRoomId(),
            dto.getNickname(),
            dto.getAuctionRoomType(),
            dto.getTitle()
        );
    }
}
