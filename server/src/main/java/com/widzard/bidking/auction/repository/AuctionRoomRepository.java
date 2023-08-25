package com.widzard.bidking.auction.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuctionRoomRepository extends JpaRepository<AuctionRoom, Long> {

    @Query("select a from AuctionRoom a"
        + " where a.auctionRoomLiveState = :state"
        + " AND a.seller = :member"
        + " order by a.startedAt")
    List<AuctionRoom> findAllByAuctionRoomLiveStateAndSeller(
        @Param("member") Member member,
        @Param("state") AuctionRoomLiveState auctionRoomLiveState);

    @Query("select a from AuctionRoom a"
        + " where a.auctionRoomLiveState = 'OFF_LIVE'"
        + " and a.id=:auctionId"
        + " order by a.startedAt desc")
    Optional<AuctionRoom> findOffLiveById(
        @Param("auctionId") Long auctionId
    );

    @Query("select a from AuctionRoom a where a.seller=:member and a.id=:auctionId")
    Optional<AuctionRoom> findByIdAndMember(
        @Param("auctionId") Long auctionId,
        @Param("member") Member member
    );


}
