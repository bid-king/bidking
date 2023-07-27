package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.entity.AuctionRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuctionCreateResponse {

    private Long id; // 생성된 경매방 고유번호

    public static AuctionCreateResponse from(AuctionRoom auctionRoom) {
        return AuctionCreateResponse.builder()
            .id(auctionRoom.getId())
            .build();
    }

}
