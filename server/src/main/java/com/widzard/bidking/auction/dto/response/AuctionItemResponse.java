package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.item.entity.Item;
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

    public static AuctionItemResponse from(Item item) {
        return new AuctionItemResponse(
            item.getId(),
            item.getImage().getFilePath(),
            item.getName(),
            item.getDescription(),
            item.getStartPrice()
        );
    }
}
