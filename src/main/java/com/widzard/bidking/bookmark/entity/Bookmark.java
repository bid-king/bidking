package com.widzard.bidking.bookmark.entity;


import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.common.entity.BaseEntity;
import com.widzard.bidking.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "bookmark")
public class Bookmark extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bookmark_code")
    private Long code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_room_code")
    private AuctionRoom auctionRoom;

    private boolean isAdded;
}
