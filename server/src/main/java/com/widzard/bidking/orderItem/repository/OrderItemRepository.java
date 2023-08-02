package com.widzard.bidking.orderItem.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.orderItem.entity.OrderItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

    @Query("SELECT o FROM OrderItem o"
        + " JOIN o.item i"
        + " WHERE i.auctionRoom = :auctionRoom")
    List<OrderItem> findOrderItemsByAuctionRoom(@Param("auctionRoom") AuctionRoom auctionRoom);
}
