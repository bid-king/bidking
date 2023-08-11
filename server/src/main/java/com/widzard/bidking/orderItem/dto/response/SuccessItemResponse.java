package com.widzard.bidking.orderItem.dto.response;

import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.OrderState;
import com.widzard.bidking.orderItem.entity.OrderItem;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SuccessItemResponse {

    private Long orderItemId;

    private String orderItemName;

    private LocalDateTime orderedAt;

    private LocalDateTime paymentDeadline;

    private Long orderPrice;

    private String sellerNickName;

    private String itemImageURL;

    private String itemDescription;

    private OrderState orderState;

    private Address address;

    public static SuccessItemResponse from(OrderItem orderItem, Member orderer) {
        return SuccessItemResponse.builder()
            .orderItemId(orderItem.getId())
            .orderItemName(orderItem.getItem().getName())
            .orderedAt(orderItem.getCreatedAt())
            .paymentDeadline(orderItem.getCreatedAt().plusDays(7))
            .orderPrice(orderItem.getPrice())
            .sellerNickName(orderItem.getOrder().getSeller().getNickname())
            .itemImageURL(orderItem.getItem().getImage().getFilePath())
            .itemDescription(orderItem.getItem().getDescription())
            .orderState(orderItem.getOrder().getOrderState())
            .address(orderer.getAddress())
            .build();
    }
}
