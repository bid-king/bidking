package com.widzard.bidking.order.entity;


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
@Table(name = "orders")
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_code")
    private Long code; // (주문코드)

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code")
    private Member orderer;

    @Enumerated(EnumType.STRING)
    private OrderState orderState; // (주문 상태 (OrderState))

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_room_code")
    private AuctionRoom auctionRoom; // 경매 방
}