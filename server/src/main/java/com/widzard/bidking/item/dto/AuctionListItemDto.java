package com.widzard.bidking.item.dto;

import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemCategory;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuctionListItemDto {
    private Long id; //아이템 id

    private String name; //아이템 이름

    private ItemCategoryDto itemCategory; //아이템 카테고리

    public static AuctionListItemDto create(Item item){
        return AuctionListItemDto.builder()
            .id(item.getId())
            .name(item.getName())
            .itemCategory(ItemCategoryDto.create(item.getItemCategory()))
            .build();
    }

}
