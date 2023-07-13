package com.widzard.bidking.item.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "item_category")
public class ItemCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "item_category_code")
    private Long code;
    private String name;// (카테명)
    @OneToMany(mappedBy = "itemCategory")
    private List<Item> itemList = new ArrayList<>();// (상품코드, Item)

}