package com.widzard.bidking.auction.service;


import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.member.entity.Member;

public interface AuctionService {

//    public AuctionRoom createAuctionRoom(AuctionCreateRequest auctionCreateRequest);

    public AuctionRoom readAuctionRoom(Long id);

    AuctionRoom createAuctionRoom(Member member, AuctionCreateRequest auctionCreateRequest);
}
