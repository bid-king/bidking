package com.widzard.bidking.item.dto.response;

import com.widzard.bidking.item.entity.ItemCategory;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
public class ItemCategoryResponse {

    private Long id;

    private String name;

    public static ItemCategoryResponse createResponse(ItemCategory itemCategory) {
        return ItemCategoryResponse.builder()
            .id(itemCategory.getId())
            .name(itemCategory.getName())
            .build();
    }
}
