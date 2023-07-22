package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.image.entity.repository.ImageRepository;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemCategory;
import com.widzard.bidking.item.entity.repository.ItemCategoryRepository;
import com.widzard.bidking.item.entity.repository.ItemRepository;
import com.widzard.bidking.member.entity.Member;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRoomRepository auctionRoomRepository;
    private final ItemRepository itemRepository;
    private final ItemCategoryRepository itemCategoryRepository;
    private final ImageRepository imageRepository;


    public AuctionServiceImpl(AuctionRoomRepository auctionRoomRepository,
        ItemRepository itemRepository, ItemCategoryRepository itemCategoryRepository,
        ImageRepository imageRepository
    ) {
        this.auctionRoomRepository = auctionRoomRepository;
        this.itemRepository = itemRepository;
        this.itemCategoryRepository = itemCategoryRepository;
        this.imageRepository = imageRepository;
    }

//    @Override
//    public AuctionRoom createAuctionRoom(AuctionCreateRequest request) {
//
//        LocalDateTime now = LocalDateTime.now();
//        if (request.getStartedAt().isBefore(now.plusHours(1))) {
//            throw new AuctionStartTimeInvalidException();
//        }
//
//        Address tempAddress = new Address("asd", "asd", "asd");
//        Member tempMember = Member.builder()
//            .id(1L)
//            .email("asd")
//            .address(tempAddress)
//            .memberRole(MemberRole.USER)
//            .nickname("asd")
//            .phoneNumber("asd")
//            .available(true)
//            .build();
//
//        //이미지는 이후에 작업하기로함
////        Image tempImage = Image.builder()
////            .id(1L)
////            .fileName("asd.jpg")
////            .filePath("asd/asd")
//////            .member(tempMember)
////            .build();
////        tempImage = imageRepository.save(tempImage);
//
//        AuctionRoom auctionRoom = AuctionRoom.builder()
////TODO 경매방 판매자 id받아오기
////            .seller(tempMember)
//            .name(request.getAuctionTitle())
//            .auctionRoomLiveState(AuctionRoomLiveState.BEFORE_LIVE)
//            .auctionRoomTradeState(AuctionRoomTradeState.BEFORE_PROGRESS)
//            .auctionRoomType(request.getAuctionRoomType())
////            .image(tempImage)
//            .build();
//        auctionRoom = auctionRoomRepository.save(auctionRoom);
//
//        return auctionRoom;
//    }

    @Override
    public AuctionRoom readAuctionRoom(Long id) {
        return auctionRoomRepository.findAuctionRoomById(id);
    }

    @Transactional
    @Override
    public AuctionRoom createAuctionRoom(Member member, AuctionCreateRequest request) {

        // ItemCategory 테스트용
        itemCategoryRepository.save(new ItemCategory(1L, "전자기기"));

        AuctionRoom auctionRoom = AuctionRoom.builder()
            .seller(member)
            .name(request.getAuctionTitle())
            .auctionRoomTradeState(AuctionRoomTradeState.BEFORE_PROGRESS)
            .auctionRoomType(request.getAuctionRoomType())
            .startedAt(toLocalDateTime(request.getStartedAt()))
            .build();

        request.getItemList().stream().map(
            r -> Item.create(
                auctionRoom,
                r.getStartPrice(),
                r.getName(),
                r.getDescription(),
                itemCategoryRepository.findById(r.getItemCategory()),
                r.getOrdering()
            )
        );

        AuctionRoom savedAuctionRoom = auctionRoomRepository.save(auctionRoom);
        log.info(String.valueOf(savedAuctionRoom));
        return savedAuctionRoom;
    }

    private LocalDateTime toLocalDateTime(String str) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(str, formatter);
    }
}
