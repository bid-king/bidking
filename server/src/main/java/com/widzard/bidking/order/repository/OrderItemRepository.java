package com.widzard.bidking.order.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.OrderItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findAllByItem_AuctionRoom(AuctionRoom auctionRoom);

    List<OrderItem> findAllByOrder_Orderer(Member member);
}
