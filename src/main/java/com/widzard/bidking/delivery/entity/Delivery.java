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
    @Column(name = "delivery_code")
    private Long code; //
    @OneToOne
    @JoinColumn(name = "order_code")
    private Order order;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_code")
    private Invoice invoice; // 배송 정보 ( 송장번호 + 택배사)

    @Enumerated(EnumType.STRING)
    private DeliveryState deliveryState;

    @Embedded
    private Address address; // (주소, Address)
    private String message; // (배송 메세지)

//    private int cost; // 배송비
}