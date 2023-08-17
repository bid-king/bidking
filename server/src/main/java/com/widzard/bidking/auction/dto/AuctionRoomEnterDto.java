package com.widzard.bidking.auction.dto;

import com.widzard.bidking.auction.entity.AuctionRoomType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRoomEnterDto {

    private boolean isSeller;
    private Long auctionRoomId;
    private String sellerNickname;
    private String nickname;
    private AuctionRoomType auctionRoomType;
    private String title;

}
