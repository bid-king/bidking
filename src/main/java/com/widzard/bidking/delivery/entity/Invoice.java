package com.widzard.bidking.delivery.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "invoice_code")
    private Long code;

    private String number;

    @Enumerated(EnumType.STRING)
    private Courier courier;
}