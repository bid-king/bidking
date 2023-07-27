package com.widzard.bidking.auction.dto.request;

import com.widzard.bidking.image.dto.ImageDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemUpdateRequest {

    private Long id;
    private String itemName;
    private Long itemCategoryId;
    private Long startPrice;
    private String description;
    private int itemOrdering;
    private ImageDto imageDto;
//    private InvoiceDto invoice; //TODO invoice 구현 후
}
