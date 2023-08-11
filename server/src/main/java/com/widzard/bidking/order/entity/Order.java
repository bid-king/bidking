package com.widzard.bidking.order.entity;


import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.delivery.entity.Delivery;
import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
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
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
    name = "orders",
    indexes = {
        @Index(name = "idx__order_state__member_id",
            columnList = "order_state, member_id")
    }
)
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id; // (주문코드)

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member orderer;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'PAYMENT_WAITING'")
    @Column(name = "order_state", nullable = false, length = 20)
    private OrderState orderState; // (주문 상태 (OrderState))

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_room_id", nullable = false)
    private AuctionRoom auctionRoom; // 경매 방

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;

    public static Order create(AuctionRoom auctionRoom, Member orderer, OrderState orderState) {
        return Order.builder()
            .orderer(orderer)
            .orderState(orderState)
            .auctionRoom(auctionRoom)
            .build();
    }
}