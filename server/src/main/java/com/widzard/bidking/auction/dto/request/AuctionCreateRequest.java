package com.widzard.bidking.auction.dto.request;

import com.widzard.bidking.auction.entity.AuctionRoomType;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.item.entity.Item;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuctionCreateRequest {

    @NonNull
    private String auctionTitle; //경매방 제목
    @NonNull
    private LocalDateTime startedAt; //경매방 시작시간
    @NonNull
    private AuctionRoomType auctionRoomType; //경매 방식
    @NonNull
    private Boolean itemPermissionChecked; // 금지 품목 규정 확인 여부
    @NonNull
    private Boolean deliveryRulesChecked; // 배송 규정 확인 여부
    @NonNull
    private Image image; // 경매방 썸네일
    @NonNull
    private List<Item> itemList; // 상품 리스트
}