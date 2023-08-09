package com.widzard.bidking.alarm.entity;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum Content {
    /*
        주문 및 배송
     */
    ITEM_SUCCESS("상품이 낙찰되었습니다.", AlarmType.ORDER.toString(), MediaType.NOTIFICATION.toString()),
    ORDER_DUE_CLOSE("오늘 결제가 마감됩니다.", AlarmType.ORDER.toString(), MediaType.NOTIFICATION.toString()),
    ORDER_CANCELED("주문이 취소되었습니다.", AlarmType.ORDER.toString(), MediaType.NOTIFICATION.toString()),
    ORDER_SUCCESS("결제가 완료되었습니다.", AlarmType.ORDER.toString(), MediaType.NOTIFICATION.toString()),
    DELIVERY_DUE_CLOSE("오늘 송장 입력이 마감됩니다.", AlarmType.DELIVERY.toString(),
        MediaType.NOTIFICATION.toString()),
    DELIVERY_CANCELED("배송이 취소되었습니다.", AlarmType.DELIVERY.toString(),
        MediaType.NOTIFICATION.toString()),
    DELIVERY_STARTED("배송이 시작되었습니다.", AlarmType.DELIVERY.toString(),
        MediaType.NOTIFICATION.toString()),
    DELIVERY_SUCCESS("배송이 완료되었습니다.", AlarmType.DELIVERY.toString(),
        MediaType.NOTIFICATION.toString()),

    /*
        경매
     */
    AUCTION_REGISTERED("경매가 등록되었습니다.", AlarmType.AUCTION.toString(),
        MediaType.NOTIFICATION.toString()),
    AUCTION_UPCOMING("경매가 시작될 예정입니다.", AlarmType.DELIVERY.toString(),
        MediaType.NOTIFICATION.toString()),
    AUCTION_UPCOMING_BOOKMARK("관심 경매가 곧 시작됩니다.", AlarmType.AUCTION.toString(),
        MediaType.NOTIFICATION.toString()),
    AUCTION_UPDATED_BOOKMARK("관심 경매가 수정되었습니다.", AlarmType.AUCTION.toString(),
        MediaType.NOTIFICATION.toString()),
    AUCTION_DELETED_BOOKMARK("관심 경매가 취소되었습니다.", AlarmType.AUCTION.toString(),
        MediaType.NOTIFICATION.toString());

    private final String content;
    private final String mediaType;
    private final String alarmType;

    Content(String content, String alarmType, String mediaType) {
        this.content = content;
        this.alarmType = alarmType;
        this.mediaType = mediaType;
    }
}
