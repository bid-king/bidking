package com.widzard.bidking.auction.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AfterAuctionDto {

    private Long sellerId;
    private Long auctionRoomId;
    private String auctionRoomTitle;
    private int orderSuccessCnt;
    private int orderFailCnt;
    private List<OrdererDto> ordererDtoList;


}
