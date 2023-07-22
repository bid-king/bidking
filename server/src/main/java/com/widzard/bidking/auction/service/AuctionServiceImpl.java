package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.entity.repository.ImageRepository;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.repository.ItemRepository;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.entity.MemberRole;
import java.time.LocalDateTime;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


@Component
@Transactional
@Slf4j
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRoomRepository auctionRoomRepository;
    private final ItemRepository itemRepository;
    private final ImageRepository imageRepository;


    public AuctionServiceImpl(AuctionRoomRepository auctionRoomRepository,
        ItemRepository itemRepository, ImageRepository imageRepository
    ) {
        this.auctionRoomRepository = auctionRoomRepository;
        this.itemRepository = itemRepository;
        this.imageRepository = imageRepository;
    }

    @Override
    public AuctionRoom createAuctionRoom(AuctionCreateRequest request) {

        LocalDateTime now = LocalDateTime.now();
        if (request.getStartedAt().isBefore(now.plusHours(1))) {
            throw new AuctionStartTimeInvalidException();
        }

        Address tempAddress = new Address("asd", "asd", "asd");
        Member tempMember = Member.builder()
            .id(1L)
            .email("asd")
            .address(tempAddress)
            .memberRole(MemberRole.USER)
            .nickname("asd")
            .phoneNumber("asd")
            .available(true)
            .build();

        //이미지는 이후에 작업하기로함
//        Image tempImage = Image.builder()
//            .id(1L)
//            .fileName("asd.jpg")
//            .filePath("asd/asd")
////            .member(tempMember)
//            .build();
//        tempImage = imageRepository.save(tempImage);

        AuctionRoom auctionRoom = AuctionRoom.builder()
//TODO 경매방 판매자 id받아오기
//            .seller(tempMember)
            .name(request.getAuctionTitle())
            .auctionRoomLiveState(AuctionRoomLiveState.BEFORE_LIVE)
            .auctionRoomTradeState(AuctionRoomTradeState.BEFORE_PROGRESS)
            .auctionRoomType(request.getAuctionRoomType())
//            .image(tempImage)
            .build();
        auctionRoom = auctionRoomRepository.save(auctionRoom);



        return auctionRoom;
    }

    @Override
    public AuctionRoom readAuctionRoom(Long id) {
        return auctionRoomRepository.findAuctionRoomById(id);
    }

    @Override
    public AuctionRoom createAuctionRoom(Long memberId, AuctionCreateRequest request) {

        return null;
    }
}
