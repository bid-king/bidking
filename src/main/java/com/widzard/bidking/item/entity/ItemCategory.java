package com.widzard.bidking.item.entity;

import com.widzard.bidking.common.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "item_category")
public class ItemCategory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "item_category_code")
    private Long code;
    private String name;// (카테명)
    @OneToMany(mappedBy = "itemCategory")
    private List<Item> itemList = new ArrayList<>();// (상품코드, Item)

}