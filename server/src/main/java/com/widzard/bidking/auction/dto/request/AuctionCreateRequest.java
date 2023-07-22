package com.widzard.bidking.auction.dto.request;

import com.widzard.bidking.auction.entity.AuctionRoomType;
import com.widzard.bidking.item.entity.Item;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class AuctionCreateRequest {

    @NotBlank(message = "경매방 제목을 입력하세요")
    private String auctionTitle; //경매방 제목

    @NotNull(message = "시작 시간을 입력하세요")
    private LocalDateTime startedAt; //경매방 시작시간

    @NotNull(message = "경매 방식을 선택하세요")
    private AuctionRoomType auctionRoomType; //경매 방식

    @AssertTrue(message = "금지 품목 규정 확인 여부를 체크하세요")
    private Boolean itemPermissionChecked; // 금지 품목 규정 확인 여부

    @AssertTrue(message = "배송 규정 확인 여부를 체크하세요")
    private Boolean deliveryRulesChecked; // 배송 규정 확인 여부

    @Valid
    private List<ItemCreateRequest> itemList; // 상품 리스트

    public AuctionCreateRequest() {
    }

    public AuctionCreateRequest(String auctionTitle, LocalDateTime startedAt,
        AuctionRoomType auctionRoomType, Boolean itemPermissionChecked,
        Boolean deliveryRulesChecked,
        List<ItemCreateRequest> itemList) {
        this.auctionTitle = auctionTitle;
        this.startedAt = startedAt;
        this.auctionRoomType = auctionRoomType;
        this.itemPermissionChecked = itemPermissionChecked;
        this.deliveryRulesChecked = deliveryRulesChecked;
        this.itemList = itemList;
    }

    public String getAuctionTitle() {
        return auctionTitle;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public AuctionRoomType getAuctionRoomType() {
        return auctionRoomType;
    }

    public Boolean getItemPermissionChecked() {
        return itemPermissionChecked;
    }

    public Boolean getDeliveryRulesChecked() {
        return deliveryRulesChecked;
    }

    public List<ItemCreateRequest> getItemList() {
        return itemList;
    }
}