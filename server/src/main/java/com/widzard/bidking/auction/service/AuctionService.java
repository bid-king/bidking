package com.widzard.bidking.auction.service;


import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.member.entity.Member;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface AuctionService {

    AuctionRoom readAuctionRoom(Long auctionId);

    AuctionRoom createAuctionRoom(Member member, AuctionCreateRequest auctionCreateRequest, MultipartFile auctionRoomImg, MultipartFile[] itemImgs)
        throws IOException;

    AuctionRoom updateAuctionRoom(Long auctionId, AuctionUpdateRequest req);
}
