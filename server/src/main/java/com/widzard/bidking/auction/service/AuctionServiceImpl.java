package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomState;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.entity.repository.ImageRepository;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.repository.ItemRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Component
@Transactional
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRoomRepository auctionRoomRepository;
    private final ItemRepository itemRepository;
    private final ImageRepository imageRepository;

    @Autowired
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

        //ItemList 의 각 item  및 item의 image save
        List<Item> itemList = auctionCreateRequest.getItemList();
        for (Item item : itemList) {
            Image itemImage = Image.builder()
//                .filePath()
//                .fileName(item.getName())
                .build();
            itemImage = imageRepository.save(itemImage);

            item = Item.builder()
                .image(itemImage)
                .build();
            item = itemRepository.save(item);
        }

        //AuctionRoom image save ( thumnail )
        Image auctionRoomThumnail = Image.builder()
//            .filePath()
//            .fileName(auctionCreateRequest.getImageName())
            .build();
        auctionRoomThumnail = imageRepository.save(auctionRoomThumnail);

        AuctionRoom auctionRoom = AuctionRoom.builder()
//            .seller()
            .name(auctionCreateRequest.getAuctionTitle())
            .auctionRoomState(AuctionRoomState.BEFORE)
            .auctionRoomType(auctionCreateRequest.getAuctionRoomType())
            .image(auctionRoomThumnail)
            .itemList(itemList)
            .build();
        auctionRoom = auctionRoomRepository.save(auctionRoom);

        return auctionRoom;
    }
}
