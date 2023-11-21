package com.widzard.bidking.order.service;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.OrderItem;
import java.util.List;

public interface OrderItemService {

    List<OrderItem> readOrderItemByMember(Member member);
}
