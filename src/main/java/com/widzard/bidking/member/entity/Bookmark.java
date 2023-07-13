package com.widzard.bidking.member.entity;


import com.widzard.bidking.auction.entity.AuctionRoom;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "bookmark")
public class Bookmark {

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
