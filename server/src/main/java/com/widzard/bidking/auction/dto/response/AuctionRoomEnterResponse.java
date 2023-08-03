package com.widzard.bidking.auction.dto.response;

import com.widzard.bidking.auction.entity.AuctionRoomType;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRoomEnterResponse {

    private Long auctionRoomId;
    private String nickname;
    private AuctionRoomType auctionRoomType;
    private String title;
    private int currentItemId;
    private List<AuctionItemResponse> itemList = new ArrayList<>();

}
