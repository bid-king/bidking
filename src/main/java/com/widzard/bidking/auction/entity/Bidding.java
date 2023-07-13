package com.widzard.bidking.auction.entity;


import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "bidding")
public class Bidding {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bidding_code")
    Long code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code")
    Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_code")
    Item item;

    LocalDateTime bidAt;

    Long price;
}