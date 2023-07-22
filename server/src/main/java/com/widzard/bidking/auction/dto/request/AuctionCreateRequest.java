package com.widzard.bidking.auction.dto.request;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.auction.entity.AuctionRoomType;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemState;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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

    public List<Item> toItem() {
        return this.itemList.stream().map(
            itemRequest -> Item.builder()
                .startPrice(itemRequest.getStartPrice())
                .name(itemRequest.getName())
                .description(itemRequest.getDescription())
                .itemState(ItemState.PRE_AUCTION)
                .itemCategory(itemRequest.getItemCategory())
                .ordering(itemRequest.getOrdering())
                .build()
        ).collect(Collectors.toList());
    }
    public AuctionRoom toEntity() {
        return AuctionRoom.builder()
            .name(this.auctionTitle)
            .auctionRoomTradeState(AuctionRoomTradeState.BEFORE_PROGRESS)
            .auctionRoomType(this.auctionRoomType) // TODO enumerate string으로 바로 들어오는가? 안들어오면 변환해줘야함
            .build();
    }
}