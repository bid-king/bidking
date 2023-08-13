package com.widzard.bidking.item.entity;


import com.widzard.bidking.item.dto.request.ItemUpdateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.order.entity.OrderItem;
import javax.persistence.CascadeType;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Getter
@Entity
@Builder
//@ToString
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "item")
public class Item extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;// (상품코드)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_room_id", nullable = false)
    private AuctionRoom auctionRoom;// (경매방코드)

    @Column(nullable = false)
    private Long startPrice;// (시작가)

    @Column(nullable = false, length = 50)
    private String name;//(상품명)

    @Column(nullable = false)
    private String description;// (설명)

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'BEFORE_AUCTION'")
    @Column(nullable = false, length = 20)
    private ItemState itemState;// (상태)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_category_id", nullable = false)
    private ItemCategory itemCategory;// (카테고리)

    @OneToOne(mappedBy = "item")
    private OrderItem orderItem;

    @Column(nullable = false)
    private int ordering;// (순서)

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", nullable = false)
    private Image image;// (대표이미지)


    public static Item create(
        AuctionRoom auctionRoom,
        Long startPrice,
        String name,
        String description,
        ItemCategory itemCategory,
        int ordering,
        Image itemImg
    ) {
        return Item.builder()
            .auctionRoom(auctionRoom)
            .startPrice(startPrice)
            .name(name)
            .description(description)
            .itemState(ItemState.BEFORE_AUCTION)
            .itemCategory(itemCategory)
            .ordering(ordering)
            .image(itemImg)
            .build();
    }

    public void registAuctionRoom(AuctionRoom auctionRoom) {
        this.auctionRoom = auctionRoom;
    }

    public void update(ItemUpdateRequest updateRequest, ItemCategory itemCategory) {
        this.itemCategory = itemCategory;
        this.name = updateRequest.getItemName();
        this.ordering = updateRequest.getOrdering();
        this.startPrice = updateRequest.getStartPrice();
        this.description = updateRequest.getDescription();
    }
}