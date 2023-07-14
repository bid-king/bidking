package com.widzard.bidking.delivery.entity;

import com.widzard.bidking.common.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "invoice")
public class Invoice extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "invoice_code")
    private Long code;

    private String number;

    @Enumerated(EnumType.STRING)
    private Courier courier;
}