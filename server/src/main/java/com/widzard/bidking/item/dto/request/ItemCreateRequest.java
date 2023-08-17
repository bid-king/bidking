package com.widzard.bidking.item.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemCreateRequest {

    @NotNull(message = "시작가를 입력하세요")
    private Long startPrice;// (시작가)

    @NotBlank(message = "상품명을 입력하세요")
    private String name;//(상품명)

    @NotBlank(message = "설명을 입력하세요")
    private String description;// (설명)

    @NotNull(message = "카테고리를 선택하세요")
    private Long itemCategory;//(카테고리)

    @NotNull(message = "순서를 입력하세요")
    private int ordering;// (순서)

    @Builder
    public ItemCreateRequest(Long startPrice, String name, String description,
        Long itemCategory, int ordering) {
        this.startPrice = startPrice;
        this.name = name;
        this.description = description;
        this.itemCategory = itemCategory;
        this.ordering = ordering;
    }

}
