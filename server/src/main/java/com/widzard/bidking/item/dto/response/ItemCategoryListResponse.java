package com.widzard.bidking.item.dto.response;

import com.widzard.bidking.item.entity.ItemCategory;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
public class ItemCategoryListResponse {

    List<ItemCategoryResponse> categoryList = new ArrayList<>();

    public static ItemCategoryListResponse from(List<ItemCategory> itemCategoryList) {
        ItemCategoryListResponse itemCategoryListResponse = new ItemCategoryListResponse();
        for (ItemCategory itemCategory : itemCategoryList) {
            itemCategoryListResponse.add(ItemCategoryResponse.createResponse(itemCategory));
        }
        return itemCategoryListResponse;
    }

    public void add(ItemCategoryResponse itemCategoryResponse) {
        this.categoryList.add(itemCategoryResponse);
    }
}
