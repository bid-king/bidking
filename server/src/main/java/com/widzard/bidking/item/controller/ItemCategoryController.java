package com.widzard.bidking.item.controller;

import com.widzard.bidking.item.dto.response.ItemCategoryListResponse;
import com.widzard.bidking.item.entity.ItemCategory;
import com.widzard.bidking.item.service.ItemCategoryService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
public class ItemCategoryController {

    private final ItemCategoryService itemCategoryService;

    @GetMapping("/categories")
    public ResponseEntity<ItemCategoryListResponse> getCategoryList() {
        List<ItemCategory> categoryList = itemCategoryService.getCategoryList();
        ItemCategoryListResponse response = ItemCategoryListResponse.createResponse(categoryList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
