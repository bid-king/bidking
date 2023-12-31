package com.widzard.bidking.item.dto;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.OrderItem;
import com.widzard.bidking.order.entity.OrderState;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemSellerDto {

    private Long itemId; // 상품 pk

    private String itemName; // 상품 이름

    private String category; // 상품 카테고리

    private Long price; // 상품 가격

    private String itemImageUrl; // 상품 이미지

    private String itemDescription; // 상품 설명

    private int itemOrdering; // 상품 순서

    private LocalDateTime successTime; // 낙찰 시간

    private Long successMemberId; // 낙찰자 pk

    private String successMemberNickname; // 낙찰자 닉네임

    private String deliveryAddress; // 배송 주소

    private String deliveryMsg; // 배송 메시지

    private OrderState orderState; // 주문 상태

//    private invoiceDto invoice; //TODO invoice 구현 후


    public static ItemSellerDto create(OrderItem orderItem) {
        ItemSellerDto result = ItemSellerDto.builder()
            .itemId(orderItem.getId())
            .itemName(orderItem.getItem().getName())
            .category(orderItem.getItem().getItemCategory().getName())
            .price(orderItem.getPrice())
            .itemImageUrl(orderItem.getItem().getImage().getFilePath())
            .itemDescription(orderItem.getItem().getDescription())
            .itemOrdering(orderItem.getItem().getOrdering())
            .orderState(orderItem.getOrder().getOrderState())
            .successTime(orderItem.getCreatedAt()) // 주문 생성 시간 (낙찰/유찰 무관)
            .build();

        if (orderItem.getOrder().getOrderer() != null) {
            result.success(orderItem.getOrder().getOrderer());
        }
        return result;

    }

    private void success(Member orderer) {
        this.successMemberId = orderer.getId();
        this.successMemberNickname = orderer.getNickname();
    }

}
