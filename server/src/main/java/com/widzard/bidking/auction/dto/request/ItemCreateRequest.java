package com.widzard.bidking.auction.dto.request;

import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemCategory;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

// TODO 이미지
public class ItemCreateRequest {

    @NotNull(message = "시작가를 입력하세요")
    private Long startPrice;// (시작가)

    @NotBlank(message = "상품명을 입력하세요")
    private String name;//(상품명)

    @NotBlank(message = "설명을 입력하세요")
    private String description;// (설명)

    @NotNull(message = "카테고리를 선택하세요")
    private ItemCategory itemCategory;//(카테고리)

    @NotNull(message = "순서를 입력하세요")
    private int ordering;// (순서)

    public ItemCreateRequest(Long startPrice, String name, String description,
        ItemCategory itemCategory, int ordering) {
        this.startPrice = startPrice;
        this.name = name;
        this.description = description;
        this.itemCategory = itemCategory;
        this.ordering = ordering;
    }

    public ItemCreateRequest() {
    }

    public Long getStartPrice() {
        return startPrice;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public ItemCategory getItemCategory() {
        return itemCategory;
    }

    public int getOrdering() {
        return ordering;
    }


}
