package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.item.dto.AuctionListItemDto;
import com.widzard.bidking.item.dto.ItemDto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuctionResponse {

    private Long id; //옥션룸 id

    private String name; //옥션 제목

    private String imageUrl; //옥션 썸네일

    private String startedAt; //옥션 시작시간

    private AuctionRoomLiveState auctionRoomLiveState; //옥션 진행 상태

    private List<AuctionListItemDto> itemListDto = new ArrayList<>(); // 옥션 리스트 아이템 리스트

    public static AuctionResponse from(AuctionRoom auctionRoom) {
        List<AuctionListItemDto> itemList = auctionRoom.getItemList().stream()
            .map(AuctionListItemDto::create)
            .collect(Collectors.toList());

        return AuctionResponse.builder()
            .id(auctionRoom.getId())
            .name(auctionRoom.getName())
            .imageUrl(auctionRoom.getImage().getFilePath())
            .startedAt(auctionRoom.getStartedAt())
            .auctionRoomLiveState(auctionRoom.getAuctionRoomLiveState())
            .itemListDto(itemList)
            .build();
    }
}
