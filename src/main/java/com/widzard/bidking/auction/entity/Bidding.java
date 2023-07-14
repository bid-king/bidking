package com.widzard.bidking.auction.entity;


import com.widzard.bidking.common.entity.BaseEntity;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "bidding")
public class Bidding extends BaseEntity {

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

    Long price;
}