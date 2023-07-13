package com.widzard.bidking.auction.entity;


import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Entity
@Table(name = "auction_room")
public class AuctionRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "auction_room_code")
    private Long code;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code")
    private Member seller; //
    private String name; //(방이름)
    private AuctionRoomState auctionRoomState; // (상태)
    @Enumerated(EnumType.STRING)
    private AuctionRoomType auctionRoomType; // (경매방식)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_code")
    private Image image; // (썸네일)
    @OneToMany(mappedBy = "auctionRoom")
    private List<Item> itemList = new ArrayList<>(); // (상품리스트)
    private LocalDateTime startedAt; // 경매방 시작 시간

}
