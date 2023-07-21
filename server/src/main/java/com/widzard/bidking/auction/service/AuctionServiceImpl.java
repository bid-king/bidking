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
    public AuctionRoom createAuctionRoom(AuctionCreateRequest auctionCreateRequest) {

        LocalDateTime now = LocalDateTime.now();
        if (auctionCreateRequest.getStartedAt().isBefore(now.plusHours(1))) {
            throw new AuctionStartTimeInvalidException();
        }
        
        Address tempAddress = new Address("asd", "asd", "asd");
        Member tempMember = Member.builder()
            .birth("asd123")

            .id(1L)
            .email("asd")
            .address(tempAddress)
            .memberRole(MemberRole.USER)
            .gender("asd")
            .nickname("asd")
            .phoneNumber("asd")
            .available(true)
            .build();

        Image tempImage = Image.builder()
            .id(1L)
            .fileName("asd.jpg")
            .filePath("asd/asd")
//            .member(tempMember)
            .build();
        tempImage = imageRepository.save(tempImage);

        System.out.println(auctionCreateRequest.getItemList().get(0).toString());
        AuctionRoom auctionRoom = AuctionRoom.builder()
//TODO 경매방 판매자 id받아오기
//            .seller(tempMember)
            .name(auctionCreateRequest.getAuctionTitle())
            .auctionRoomLiveState(AuctionRoomLiveState.BEFORE_LIVE)
            .auctionRoomTradeState(AuctionRoomTradeState.BEFORE_PROGRESS)
            .auctionRoomType(auctionCreateRequest.getAuctionRoomType())
            .itemList(auctionCreateRequest.getItemList())
//            .image(tempImage)
            .build();
        auctionRoom = auctionRoomRepository.save(auctionRoom);

        //ItemList의 item && item의 image save
        List<Item> itemList = auctionRoom.getItemList();
        for (Item item : itemList) {
            Image itemImage = Image.builder()
//TODO 각 아이템 image file 저장 로직
//                .member(m)
                .filePath("asd/asd")
                .fileName("asd.jpg")
                .build();
            itemImage = imageRepository.save(itemImage);

            item = Item.builder()
                .image(itemImage)
                .description(item.getDescription())
                .auctionRoom(auctionRoom)
//TODO itemCategory 정하고 매핑해야함
//                .itemCategory()
                .build();
            log.info("item is{}", item.toString());
            item = itemRepository.save(item);
        }
        return auctionRoom;
    }

    @Override
    public AuctionRoom readAuctionRoom(Long id) {
        return auctionRoomRepository.findAuctionRoomById(id);
    }
}
