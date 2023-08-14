package com.widzard.bidking.order.service;

import com.widzard.bidking.order.entity.Order;
import com.widzard.bidking.order.entity.OrderState;

public interface OrderService {

    Order createOrder(
        Long auctionRoomId,
        Long ordererId,
        OrderState orderState,
        Long itemId,
        Long price
    );

    Order failOrder(Long auctionId, Long itemId);
}
