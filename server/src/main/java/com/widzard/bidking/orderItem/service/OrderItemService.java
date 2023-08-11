package com.widzard.bidking.orderItem.service;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.orderItem.entity.OrderItem;
import java.util.List;
import java.util.Optional;

public interface OrderItemService {

    List<Optional<OrderItem>> readOrderItemByMember(Member member);
}
