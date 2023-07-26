package com.widzard.bidking.item.dto;

import com.widzard.bidking.item.entity.ItemCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ItemCategoryDto {

    private Long id;
    private String name;

    public static ItemCategoryDto create(ItemCategory itemCategory) {
        return ItemCategoryDto.builder()
            .id(itemCategory.getId())
            .name(itemCategory.getName())
            .build();
    }
}
