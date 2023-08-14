package com.widzard.bidking.item.service;

import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.exception.ItemIsNotStartedException;
import com.widzard.bidking.item.exception.ItemNotFoundException;
import com.widzard.bidking.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Override
    public void isInAuction(Long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(ItemNotFoundException::new);
        if (!item.isBidStarted()) {
            throw new ItemIsNotStartedException();
        }
    }
}
