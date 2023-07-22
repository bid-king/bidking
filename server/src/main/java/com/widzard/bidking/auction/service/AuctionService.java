package com.widzard.bidking.auction.service;


import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;

public interface AuctionService {

    public AuctionRoom createAuctionRoom(AuctionCreateRequest auctionCreateRequest);

    public AuctionRoom readAuctionRoom(Long id);

    AuctionRoom createAuctionRoom(Long id, AuctionCreateRequest auctionCreateRequest);
}
