package com.widzard.bidking.auction.service;


import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.response.AuctionCreateResponse;
import com.widzard.bidking.member.entity.Member;

public interface AuctionService {

    AuctionCreateResponse createAuctionRoom(Member member,
        AuctionCreateRequest auctionCreateRequest);
}
