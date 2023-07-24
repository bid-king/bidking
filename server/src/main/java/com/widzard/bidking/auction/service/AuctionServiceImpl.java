package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.ItemCreateRequest;
import com.widzard.bidking.auction.dto.response.AuctionCreateResponse;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.auction.exception.AuctionRoomNotFoundException;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.global.util.TimeUtility;
import com.widzard.bidking.image.entity.repository.ImageRepository;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemCategory;
import com.widzard.bidking.item.exception.EmptyItemListException;
import com.widzard.bidking.item.exception.ItemCategoryNotFoundException;
import com.widzard.bidking.item.repository.ItemCategoryRepository;
import com.widzard.bidking.item.repository.ItemRepository;
import com.widzard.bidking.member.entity.Member;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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


    @Transactional
    @Override
    public AuctionCreateResponse createAuctionRoom(Member member, AuctionCreateRequest request) {

        //시작시간 예외 로직
        LocalDateTime now = LocalDateTime.now();
        if (TimeUtility.toLocalDateTime(request.getStartedAt()).isBefore(now.plusHours(1))) {
            throw new AuctionStartTimeInvalidException();
        }
        //TODO ItemCategory 테스트용
        itemCategoryRepository.save(new ItemCategory(0L, "전자기기"));

        AuctionRoom auctionRoom = AuctionRoom.builder()
//            .seller(member)//TODO member 추가 후 주석 해제
            .name(request.getAuctionTitle())
            .auctionRoomLiveState(AuctionRoomLiveState.BEFORE_LIVE)
            .auctionRoomTradeState(AuctionRoomTradeState.BEFORE_PROGRESS)
            .auctionRoomType(request.getAuctionRoomType())
            .startedAt(request.getStartedAt())
            .build();

        AuctionRoom savedAuctionRoom = auctionRoomRepository.save(auctionRoom);
        List<ItemCreateRequest> itemCreateRequestList = request.getItemList();

        if (itemCreateRequestList == null || itemCreateRequestList.size() == 0) {
            throw new EmptyItemListException();
        }
        itemCreateRequestList.forEach(
            r -> {
                Optional<ItemCategory> itemCategoryOptional = itemCategoryRepository.findById(
                    r.getItemCategory());
                if (itemCategoryOptional.isEmpty()) {
                    throw new ItemCategoryNotFoundException();
                }
                ItemCategory itemCategory = itemCategoryOptional.get();
                Item item = Item.create(
                    savedAuctionRoom,
                    r.getStartPrice(),
                    r.getName(),
                    r.getDescription(),
                    itemCategory,
                    r.getOrdering()
                );
                itemRepository.save(item);
            }
        );
        return AuctionCreateResponse.builder()
            .id(savedAuctionRoom.getId())
            .build();
    }

    @Override
    public AuctionRoom readAuctionRoom(Member tempMember, Long auctionId) {

        Optional<AuctionRoom> auctionRoomOptional = auctionRoomRepository.findById(auctionId);
        if (auctionRoomOptional.isEmpty()) {
            throw new AuctionRoomNotFoundException();
        }
        AuctionRoom auctionRoom = auctionRoomOptional.get();

        return auctionRoom;
    }

}
