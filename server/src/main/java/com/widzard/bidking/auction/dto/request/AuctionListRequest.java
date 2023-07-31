package com.widzard.bidking.auction.dto.request;

import com.widzard.bidking.item.entity.ItemCategory;
import java.util.List;
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

    @NotNull
    private int page; // 현재 페이지

    @NotNull
    private int perPage; // 페이지당 경매

    @NotNull
    private List<ItemCategory> categoryList; // 적용된 카테고리
}
