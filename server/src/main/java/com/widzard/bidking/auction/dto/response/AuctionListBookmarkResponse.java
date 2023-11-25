package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.dto.BookmarkedAuctionDto;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuctionListBookmarkResponse {

    @Default
    private List<BookmarkedAuctionDto> auctionBookmarkDtoList = new ArrayList<>();

    private long totalPage;

    private long currentPage;

    private boolean hasNext;

    public static AuctionListBookmarkResponse from(List<BookmarkedAuctionDto> auctionBookmarkDtoList, long totalPage, long currentPage, boolean hasNext){
        return AuctionListBookmarkResponse.builder()
            .auctionBookmarkDtoList(auctionBookmarkDtoList)
            .totalPage(totalPage)
            .currentPage(currentPage)
            .hasNext(hasNext)
            .build();
    }
}
