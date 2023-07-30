package com.widzard.bidking.auction.dto.request;

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

    private boolean isBookmarked; // 북마크 되어있나 -> 이것보단 내 member id가 필요할듯?

    private boolean inProgress; // 진행중인가 -> response에 들어갈속성아닌가
    @NotNull
    private int page; // 현재 페이지
    @NotNull
    private int perPage; // 페이지당 경매
    @NotNull
    private List<Long> categoryList; // 적용된 카테고리

}
