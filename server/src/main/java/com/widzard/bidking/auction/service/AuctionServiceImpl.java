package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomState;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Component
@Transactional
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRoomRepository auctionRoomRepository;

    @Autowired
    public AuctionServiceImpl(AuctionRoomRepository auctionRoomRepository) {
        this.auctionRoomRepository = auctionRoomRepository;
    }

    @Override
    public AuctionRoom createAuctionRoom(AuctionCreateRequest auctionCreateRequest) {
        LocalDateTime now = LocalDateTime.now();
        if (auctionCreateRequest.getStartedAt().isBefore(now.plusHours(1))) {
            throw new AuctionStartTimeInvalidException();
        }

        AuctionRoom auctionRoom = AuctionRoom.builder()
//            .seller()
            .name(auctionCreateRequest.getAuctionTitle())
            .auctionRoomState(AuctionRoomState.BEFORE)
            .auctionRoomType(auctionCreateRequest.getAuctionRoomType())
            .image(auctionCreateRequest.getImage())
            .itemList(auctionCreateRequest.getItemList())
            .build();

        auctionRoom = auctionRoomRepository.save(auctionRoom);

        return auctionRoom;
    }
}
