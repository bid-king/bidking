package com.widzard.bidking.auction.service;


import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.member.entity.Member;

public interface AuctionService {

    //TODO 머지 후 엔티티 리턴 방식으로 변경
    AuctionRoom createAuctionRoom(Member member,
        AuctionCreateRequest auctionCreateRequest);

    AuctionRoom readAuctionRoom(Member tempMember, Long auctionId);
}
