package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.ItemCreateRequest;
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
import java.util.List;
import lombok.extern.slf4j.Slf4j;
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

    @Override
    public AuctionRoom readAuctionRoom(Long id) {
        return auctionRoomRepository.findAuctionRoomById(id);
    }

    @Transactional
    @Override
    public AuctionRoom createAuctionRoom(Member member, AuctionCreateRequest request) {

        // ItemCategory 테스트용
        itemCategoryRepository.save(new ItemCategory(0L, "전자기기"));

        AuctionRoom auctionRoom = AuctionRoom.builder()
//            .seller(member)//TODO member 추가 후 주석 해제
            .name(request.getAuctionTitle())
            .auctionRoomTradeState(AuctionRoomTradeState.BEFORE_PROGRESS)
            .auctionRoomType(request.getAuctionRoomType())
            .startedAt(toLocalDateTime(request.getStartedAt()))
            .build();

        AuctionRoom savedAuctionRoom = auctionRoomRepository.save(auctionRoom);
        List<ItemCreateRequest> itemCreateRequestList = request.getItemList();

        if (itemCreateRequestList == null) {
            throw new RuntimeException("아이템이 하나도 없습니다");//TODO EmptyItemListException 추가 후 주석 해제
        }
        itemCreateRequestList.forEach(
            r -> {
                Item item = Item.create(
                    auctionRoom,
                    r.getStartPrice(),
                    r.getName(),
                    r.getDescription(),
                    itemCategoryRepository.getOne(r.getItemCategory()),
                    r.getOrdering()
                );
                itemRepository.save(item);
            }
        );

        return savedAuctionRoom;
    }

    private LocalDateTime toLocalDateTime(String str) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(str, formatter);
    }
}
