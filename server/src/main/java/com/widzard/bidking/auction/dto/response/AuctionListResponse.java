package com.widzard.bidking.auction.dto.response;

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
public class AuctionListResponse {

    @Default
    private List<AuctionResponse> auctionDtoList = new ArrayList<>();

    private long totalPage;

    private long currentPage;

    private boolean hasNext;

    public static AuctionListResponse from(Page<AuctionRoom> auctionRoomPage){
        List<AuctionResponse> auctionDtoList = new ArrayList<>();
        for (AuctionRoom auctionRoom : auctionRoomPage
        ) {
            auctionDtoList.add(AuctionResponse.from(auctionRoom));
        }

        return AuctionListResponse.builder()
            .auctionDtoList(auctionDtoList)
            .totalPage(auctionRoomPage.getTotalPages())
            .currentPage(auctionRoomPage.getNumber())
            .hasNext(auctionRoomPage.hasNext())
            .build();
    }
}
