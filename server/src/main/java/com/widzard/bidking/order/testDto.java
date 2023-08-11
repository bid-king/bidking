package com.widzard.bidking.order;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class testDto {
    private Long auctionRoomId;
    private Long ordererId;
    private Long itemId;
    private Long price;
}
