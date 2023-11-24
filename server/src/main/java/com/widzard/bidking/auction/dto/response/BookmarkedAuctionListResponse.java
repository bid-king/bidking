package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.dto.BookmarkedAuctionDto;
import com.widzard.bidking.auction.entity.AuctionRoom;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkedAuctionListResponse {

    @Default
    private List<BookmarkedAuctionDto> bookmarkedAuctionDtoList = new ArrayList<>();

    private long totalPage;

    private long currentPage;

    private boolean hasNext;

    public static BookmarkedAuctionListResponse from (Page<AuctionRoom> auctionRoomPage){
        List<BookmarkedAuctionDto> bookmarkedAuctionDtoList = new ArrayList<>();
        for (AuctionRoom auctionRoom : auctionRoomPage
        ) {
            bookmarkedAuctionDtoList.add(BookmarkedAuctionDto.from(auctionRoom, true));
        }

        return BookmarkedAuctionListResponse.builder()
            .bookmarkedAuctionDtoList(bookmarkedAuctionDtoList)
            .totalPage(auctionRoomPage.getTotalPages())
            .currentPage(auctionRoomPage.getNumber())
            .hasNext(auctionRoomPage.hasNext())
            .build();
    }
}
