package com.widzard.bidking.auction.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AuctionRoomRepository extends JpaRepository<AuctionRoom, Long>,
    JpaSpecificationExecutor<AuctionRoom> {

}
