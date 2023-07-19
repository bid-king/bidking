package com.widzard.bidking.auction.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRoomRepository extends JpaRepository<AuctionRoom, Long> {

//    @Modifying
//    @Transactional
//    @Query(value =
//        "INSERT INTO auction_room (auction_room_state, auction_room_type, name, started_at, image_code, member_code) "
//            + "VALUES (auction_room_state = :auctionRoomState, auction_room_type = :auctionRoomType, name = :name, started_at = :startedAt, image_code = :imageCode, member_code = :memberCode)", nativeQuery = true)
//    void insertAuctionRoom(@Param("auctionRoomState") Integer auctionRoomState,
//        @Param("auctionRoomType") AuctionRoomType auctionRoomType,
//        @Param("name") String name,
//        @Param("startedAt") LocalDateTime startedAt,
//        @Param("imageCode") Long imageCode,
//        @Param("memberCode") Long memberCode);

}
