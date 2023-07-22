package com.widzard.bidking.order.repository;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.Order;
import com.widzard.bidking.order.entity.OrderState;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

    int countByOrdererAndOrderState(Member orderer, OrderState orderState);
}
