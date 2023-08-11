package com.widzard.bidking.auction.entity;


import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
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
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "bidding")
public class Bidding extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bidding_id")
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id", nullable = false)
    private Long memberId;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "item_id", nullable = false)
    private Long itemId;

//    @Column(nullable = false)
    private Long price;

    private int count;

    public void raisePrice(Long price) {
        if (this.price <= price ) {
            throw new RuntimeException("현재 입찰가보다 더 높은 가격을 제시해야 합니다.");
        }
        this.price = price;
    }
}