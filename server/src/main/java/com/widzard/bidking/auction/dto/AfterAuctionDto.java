package com.widzard.bidking.auction.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
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
