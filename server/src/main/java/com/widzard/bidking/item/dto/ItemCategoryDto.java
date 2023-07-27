package com.widzard.bidking.item.dto;

import com.widzard.bidking.item.entity.ItemCategory;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
