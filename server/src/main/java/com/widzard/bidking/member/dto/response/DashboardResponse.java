package com.widzard.bidking.member.dto.response;

import com.widzard.bidking.order.entity.OrderState;
import java.util.HashMap;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class DashboardResponse {

    private int paymentWaiting;
    private int deliveryWaiting;
    private int orderCanceled;

    public static DashboardResponse createDashboard(HashMap<String, Integer> dashboard) {
        return DashboardResponse.builder()
            .paymentWaiting(dashboard.get(OrderState.PAYMENT_WAITING.toString()))
            .deliveryWaiting(dashboard.get(OrderState.DELIVERY_WAITING.toString()))
            .orderCanceled(dashboard.get(OrderState.ORDER_CANCELED.toString()))
            .build();
    }
    
}
