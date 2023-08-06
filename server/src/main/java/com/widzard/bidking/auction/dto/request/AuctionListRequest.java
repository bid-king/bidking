package com.widzard.bidking.auction.dto.request;

import com.widzard.bidking.item.entity.ItemCategory;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuctionListRequest {

    private String keyword; // 검색어

    private int page; // 현재 페이지

    private int perPage; // 페이지당 경매

    private List<Long> categoryList; // 적용된 카테고리

    public static AuctionListRequest create(String keyword, int page, int perPage,
        List<Long> categoryList) {
        return AuctionListRequest.builder()
            .keyword(keyword)
            .page(page)
            .perPage(perPage)
            .categoryList(categoryList)
            .build();
    }
}
