package com.widzard.bidking.bookmark.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.bookmark.entity.Bookmark;
import com.widzard.bidking.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findBookmarkByMemberAndAuctionRoom(Member member, AuctionRoom auctionRoom);

    Long countByMemberAndIsAddedTrue(@Param("member") Member member);

    List<Bookmark> findAllByAuctionRoomAndIsAddedTrue(AuctionRoom auctionRoom);
}
