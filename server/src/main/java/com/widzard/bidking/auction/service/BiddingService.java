package com.widzard.bidking.auction.service;

public interface BiddingService {

    void bidding(Long itemId, Long price);

    int increaseCount(Long itemId, Long quantity);
}
