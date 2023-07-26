package com.widzard.bidking.auction.dto.request;

import com.widzard.bidking.item.dto.ItemCategoryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ItemUpdateRequest {

    private Long id;
    private String itemName;
    private ItemCategoryDto itemCategory;
    private Long startPrice;
    private String description;
    private int itemOrdering;

    //TODO image 확실시 되면 구현
//    private ImageDto imageDto
//    private InvoiceDto invoice; //TODO invoice 구현 후
}
