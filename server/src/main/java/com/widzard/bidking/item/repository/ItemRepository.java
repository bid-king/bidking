package com.widzard.bidking.item.repository;

import com.widzard.bidking.item.entity.Item;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findItemByAuctionRoomIdAndOrdering(Long auctionId, int itemOrder);

}
