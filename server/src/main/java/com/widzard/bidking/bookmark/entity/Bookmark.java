package com.widzard.bidking.bookmark.entity;


import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Getter
@Entity
@Builder
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
    name = "bookmark",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "UniqueMemberAndAuctionRoom",
            columnNames = {"member_id", "auction_room_id"}
        )
    }
)
public class Bookmark extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_room_id", nullable = false)
    private AuctionRoom auctionRoom;

    @Column(nullable = false, columnDefinition="tinyint(1) default 1")
    private boolean isAdded;

    public static Bookmark createBookmark(Member member, AuctionRoom auctionRoom) {
        return Bookmark.builder()
            .member(member)
            .auctionRoom(auctionRoom)
            .isAdded(true)
            .build();
    }

    public void changeStatus() {
        this.isAdded = !this.isAdded;
    }
}

