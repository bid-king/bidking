package com.widzard.bidking.item.entity.repository;

import com.widzard.bidking.item.entity.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {

    
    ItemCategory save(ItemCategory itemCategory);

//    ItemCategory findById(Long id);//Optional 사용하지 않기 위해 getOne 사용
}
