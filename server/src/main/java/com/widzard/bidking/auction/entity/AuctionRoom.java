package com.widzard.bidking.auction.entity;


import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "auction_room")
public class AuctionRoom extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "auction_room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member seller; //

    private String name; //(방이름)

    private AuctionRoomState auctionRoomState; // (상태)

    @Enumerated(EnumType.STRING)
    private AuctionRoomType auctionRoomType; // (경매방식)

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image image; // (썸네일)

    @OneToMany(mappedBy = "auctionRoom")
    private List<Item> itemList = new ArrayList<>(); // (상품리스트)

    @Builder
    public AuctionRoom(Member seller, String name, AuctionRoomState auctionRoomState,
        AuctionRoomType auctionRoomType, Image image, List<Item> itemList) {
        this.seller = seller;
        this.name = name;
        this.auctionRoomState = auctionRoomState;
        this.auctionRoomType = auctionRoomType;
        this.image = image;
        this.itemList = itemList;
    }
}
