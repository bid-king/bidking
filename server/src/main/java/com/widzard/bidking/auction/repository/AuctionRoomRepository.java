package com.widzard.bidking.auction.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRoomRepository extends JpaRepository<AuctionRoom, Long> {

    List<AuctionRoom> findAllBySellerAndAuctionRoomLiveState(Member seller,
        AuctionRoomLiveState auctionRoomLiveState);

    Optional<AuctionRoom> findAuctionRoomByIdAndAuctionRoomLiveState(Long auctionId,
        AuctionRoomLiveState auctionRoomLiveState);

    Optional<AuctionRoom> findAuctionRoomByIdAndSeller(Long auctionId,Member seller);
}
