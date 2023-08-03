package com.widzard.bidking.auction.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionItemResponse {

    private Long itemId;
    private String imageUrl;
    private String name;
    private String description;
    private Long startPrice;

}
