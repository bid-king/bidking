package com.widzard.bidking.order.entity;


import com.widzard.bidking.item.entity.Item;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "order_item")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_item_code")
    private Long code;// (주문상품코드)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_code")
    private Order order;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_code")
    private Item item;// (상품코드, Item)
    private Long price;// (주문가격(낙찰가격))

    private LocalDateTime bidAt;// (입찰일시)

}