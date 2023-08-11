package com.widzard.bidking.auction.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRoomEnterResponse {

    private boolean isSeller;
    public static AuctionRoomEnterResponse from(boolean isSeller) {
        return new AuctionRoomEnterResponse(isSeller);
    }
}
