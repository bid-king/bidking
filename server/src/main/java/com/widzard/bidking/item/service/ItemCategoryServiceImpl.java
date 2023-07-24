package com.widzard.bidking.item.service;

import com.widzard.bidking.item.entity.ItemCategory;
import com.widzard.bidking.item.repository.ItemCategoryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemCategoryServiceImpl implements ItemCategoryService {

    private final ItemCategoryRepository itemCategoryRepository;

    @Override
    public List<ItemCategory> getCategoryList() {
        return itemCategoryRepository.findAll();
    }
}
