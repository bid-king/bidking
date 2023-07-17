package com.widzard.bidking.delivery.entity;

public enum DeliveryState {
    DELIVERY_WAITING, // 구매자 결제 후 판매자 송장번호 입력 전
    DELIVERING, // 송장번호 나온 후부터 수령확인 전
    DELIVERY_COMPLETED, // 수령 확인
}
