package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.entity.repository.ImageRepository;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.repository.ItemRepository;
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

        Image thumnail = auctionCreateRequest.createImage(auctionCreateRequest.getImageName());
        thumnail = imageRepository.save(thumnail);

        AuctionRoom auctionRoom = AuctionRoom.builder()
//TODO 경매방 판매자 id받아오기
//            .seller()
            .name(auctionCreateRequest.getAuctionTitle())
            .auctionRoomLiveState(AuctionRoomLiveState.BEFORE_LIVE)
            .auctionRoomTradeState(AuctionRoomTradeState.BEFORE_PROGRESS)
            .auctionRoomType(auctionCreateRequest.getAuctionRoomType())
            .image(thumnail)
            .build();
        auctionRoom = auctionRoomRepository.save(auctionRoom);
        log.info("auctionRoom is {}", auctionRoom.toString());

        //ItemList의 item && item의 image save
        List<Item> itemList = auctionCreateRequest.getItemList();
        for (Item item : itemList) {
            Image itemImage = Image.builder()
//TODO 각 아이템 image file 저장 로직

//                .filePath("asd/asd")
//                .fileName("asd.jpg")
                .build();
            itemImage = imageRepository.save(itemImage);

            item = Item.builder()
                .image(itemImage)
                .description(item.getDescription())
//TODO itemCategory 정하고 매핑해야함
//                .itemCategory()
                .build();
            item.setAuctionRoom(auctionRoom);

            item = itemRepository.save(item);

        }

//        auctionRoom = AuctionRoom.builder()
//            .itemList(itemList)
//            .build();
//        auctionRoom = auctionRoomRepository.save(auctionRoom);

        return auctionRoom;
    }

    @Override
    public AuctionRoom readAuctionRoom(Long id) {
        return auctionRoomRepository.findAuctionRoomById(id);
    }
}
