package com.widzard.bidking.order.repository;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.Order;
import com.widzard.bidking.order.entity.OrderState;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {

    int countByOrdererAndOrderState(Member orderer, OrderState orderState);

    @Query("SELECT o.orderState, COUNT(o.orderState) " +
        "FROM OrderItem oi " +
        "JOIN oi.order o " +
        "JOIN oi.item i " +
        "JOIN i.auctionRoom a " +
        "WHERE i.itemState = 'AFTER_AUCTION' " +
        "and a.seller = :member " +
        "AND a.auctionRoomLiveState != 'BEFORE_LIVE' " +
        "AND a.auctionRoomTradeState = 'IN_PROGRESS' " +
        "GROUP BY o.orderState")
    List<Object[]> countOrdersByState(@Param("member") Member member);
}
