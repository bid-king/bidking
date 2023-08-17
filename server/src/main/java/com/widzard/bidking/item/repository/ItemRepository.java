package com.widzard.bidking.item.repository;

import com.widzard.bidking.item.entity.Item;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("SELECT i from Item i WHERE i.auctionRoom.id = :auctionId")
    List<Item> findItemsByAuctionId(@Param("auctionId") Long auctionId);

    Optional<Item> findItemByAuctionRoomIdAndOrdering(Long auctionId, int itemOrder);

}
