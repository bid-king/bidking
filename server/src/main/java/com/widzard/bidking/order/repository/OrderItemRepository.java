package com.widzard.bidking.order.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.OrderItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("SELECT o FROM OrderItem o JOIN o.item i"
        + " WHERE i.auctionRoom = :auctionRoom")
    List<OrderItem> findOrderItemsByAuctionRoom(
        @Param("auctionRoom") AuctionRoom auctionRoom
    );

    @Query("SELECT oi FROM OrderItem oi JOIN oi.order o "
        + "WHERE o.orderer = :member")
    List<Optional<OrderItem>> findByOrderItemByMemberId(
        @Param("member") Member member
    );
}
