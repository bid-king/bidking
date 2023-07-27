package com.widzard.bidking.member.dto.response;

import com.widzard.bidking.order.entity.OrderState;
import java.util.HashMap;
import java.util.Optional;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class DashboardResponse {

    private int paymentWaiting;
    private int deliveryWaiting;
    private int penalty;

    public static DashboardResponse from(HashMap<String, Integer> dashboard) {
        return DashboardResponse.builder()
            .paymentWaiting(
                Optional.ofNullable(dashboard.get(OrderState.PAYMENT_WAITING.toString()))
                    .orElse(0))
            .deliveryWaiting(
                Optional.ofNullable(dashboard.get(OrderState.DELIVERY_WAITING.toString()))
                    .orElse(0))
            .penalty(Optional.ofNullable(dashboard.get("penalty"))
                .orElse(0))
            .build();
    }

}
