package com.widzard.bidking.item.dto;

import com.widzard.bidking.item.entity.Item;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Builder
@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemDto {

    private Long itemId;
    private String itemName;
    private String category;
    private Long startPrice;
    private String itemState;
    private String itemImageUrl;
    private String itemDescription;
    private int itemOrdering;
    private LocalDateTime successTime;
    private Long successPrice;
    private String successMemberNickname;
    private Long successMemberId;
    private String deliveryAddress;
    private String deliveryMsg;
//    private invoiceDto invoice; //TODO invoice 구현 후


    public static ItemDto create(Item item) {
        return ItemDto.builder()
            .itemId(item.getId())
            .itemName(item.getName())
            .category(item.getItemCategory().getName())
            .startPrice(item.getStartPrice())
            .itemState(item.getItemState().name())
            .itemImageUrl(item.getImage().getFilePath())
            .itemDescription(item.getDescription())
            .itemOrdering(item.getOrdering())
//            .successTime(item.getOrderItem().getCreatedAt()) TODO orderItem 구현 후 지정
            .build();
    }
}
