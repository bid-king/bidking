package com.widzard.bidking.auction.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuctionBookmarkCountResponse {

    private Long bookmarkCount;

    public static AuctionBookmarkCountResponse from(Long count) {
        return AuctionBookmarkCountResponse.builder()
            .bookmarkCount(count)
            .build();
    }
}
