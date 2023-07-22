package com.widzard.bidking.item.entity.repository;

import com.widzard.bidking.item.entity.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemCategoryRepository extends JpaRepository<Long, ItemCategory> {


    ItemCategory save(ItemCategory itemCategory);

    ItemCategory findById(Long id);
}
