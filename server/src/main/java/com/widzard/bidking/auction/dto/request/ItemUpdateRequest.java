package com.widzard.bidking.auction.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ItemUpdateRequest {

    private Long id;
    private String itemName;
    private String itemCategory;
    private Long startPrice;
    private String description;
    private int itemOrdering;

    //TODO image 확실시 되면 구현
//    private invoiceDto invoice; //TODO invoice 구현 후
}
