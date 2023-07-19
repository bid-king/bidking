package com.widzard.bidking.auction.dto.request;

import com.widzard.bidking.auction.entity.AuctionRoomType;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.item.entity.Item;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuctionCreateRequest {

    @NotBlank
    private String auctionTitle; //경매방 제목
    @NotBlank
    private LocalDateTime startedAt; //경매방 시작시간
    @NotBlank
    private AuctionRoomType auctionRoomType; //경매 방식

    @AssertTrue
    private Boolean itemPermissionChecked; // 금지 품목 규정 확인 여부

    @AssertTrue
    private Boolean deliveryRulesChecked; // 배송 규정 확인 여부
    @NotBlank
    private Image image; // 경매방 썸네일
    @NotBlank
    private List<Item> itemList; // 상품 리스트
}