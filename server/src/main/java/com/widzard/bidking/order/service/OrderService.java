package com.widzard.bidking.order.service;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.Order;

public interface OrderService {

    Order createOrder(Long auctionRoomId, Long ordererId, Boolean isSuccess, Long itemId,
        Long price);
}
