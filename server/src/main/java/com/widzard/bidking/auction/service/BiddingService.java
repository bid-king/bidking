package com.widzard.bidking.auction.service;

public interface BiddingService {

    void biddingInDB(Long itemId, Long price);

    int increaseCount(Long itemId, Long quantity);
}
