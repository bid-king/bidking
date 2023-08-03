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

    @NotBlank(message = "현재 페이지를 입력해주세요.")
    private int page; // 현재 페이지

    @NotBlank(message = "페이지당 조회할 경매 수를 입력해주세요.")
    private int perPage; // 페이지당 경매

    @NotNull(message = "카테고리 리스트를 입력해주세요")
    private List<Long> categoryList; // 적용된 카테고리

}
