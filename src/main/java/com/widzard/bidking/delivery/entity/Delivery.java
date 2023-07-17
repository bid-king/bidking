package com.widzard.bidking.delivery.entity;

import com.widzard.bidking.common.entity.Address;
import com.widzard.bidking.common.entity.BaseEntity;
import com.widzard.bidking.order.entity.Order;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "delivery")
public class Delivery extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "delivery_id")
    private Long id; //

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Enumerated(EnumType.STRING)
    private DeliveryState deliveryState;

    @Embedded
    private Address address; //

    private String message; // (배송 메세지)

    private String receiverName;

    private String receiverPhoneNumber;

//    private int cost; // 배송비

}