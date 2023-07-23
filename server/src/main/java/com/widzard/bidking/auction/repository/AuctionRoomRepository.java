package com.widzard.bidking.auction.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface AuctionRoomRepository extends JpaRepository<AuctionRoom, Long> {

    //TODO Optional 사용으로 변경 예정
    AuctionRoom findAuctionRoomById(@Param("auction_room_id") Long id);
}
