package com.widzard.bidking.bookmark.repository;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.bookmark.entity.Bookmark;
import com.widzard.bidking.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("select b from Bookmark b where b.member = :member and b.auctionRoom = :auctionRoom")
    Optional<Bookmark> findBookmarkByMemberAndAuctionRoom(
        @Param("member") Member member,
        @Param("auctionRoom") AuctionRoom auctionRoom);

}
