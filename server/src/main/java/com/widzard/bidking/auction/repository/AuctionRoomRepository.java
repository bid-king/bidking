package com.widzard.bidking.auction.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuctionRoomRepository extends JpaRepository<AuctionRoom, Long> {

    @Query("select a from AuctionRoom a"
        + " where a.auctionRoomLiveState = 'OFF_LIVE'"
        + " AND a.seller = :member")
    List<AuctionRoom> findAllAfterLiveAuctionByMemberId(
        @Param("member") Member member);
}
