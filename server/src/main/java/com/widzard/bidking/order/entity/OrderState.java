package com.widzard.bidking.order.entity;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum OrderState {

    PAYMENT_WAITING("paymentWaiting"),
    DELIVERY_WAITING("deliveryWaiting"),
    DELIVERING("delivering"),
    COMPLETED("completed"), // 낙찰되었는데 배송까지 될 경우
    ORDER_CANCELED("orderCanceled"),
    DELIVERY_CANCELED("deliveryCanceled"),
    ORDER_FAILED("orderFailed");

    private String orderValue;

    @Override
    public String toString() {
        return orderValue;
    }
}
