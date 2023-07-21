package com.widzard.bidking.item.entity;


import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.image.entity.Image;
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
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "item")
public class Item extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;// (상품코드)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_room_id")
    private AuctionRoom auctionRoom;// (경매방코드)

    private Long startPrice;// (시작가)

    private String name;//(상품명)

    private String description;// (설명)

    @Enumerated(EnumType.STRING)
    private ItemState itemState;// (상태)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_category_id")
    private ItemCategory itemCategory;//(카테고리)

    private int ordering;// (순서)

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image image;// (대표이미지)

    public void setAuctionRoom(AuctionRoom auctionRoom) {
        this.auctionRoom = auctionRoom;
        auctionRoom.getItemList().add(this);
    }

    public void setItemCategory(ItemCategory itemCategory) {
        this.itemCategory = itemCategory;
        itemCategory.getItemList().add(this);
    }

}