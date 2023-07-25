package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.ItemCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.exception.AuctionRoomNotFoundException;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.global.util.TimeUtility;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.service.ImageService;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemCategory;
import com.widzard.bidking.item.exception.EmptyItemListException;
import com.widzard.bidking.item.repository.ItemCategoryRepository;
import com.widzard.bidking.item.repository.ItemRepository;
import com.widzard.bidking.member.entity.Member;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRoomRepository auctionRoomRepository;
    private final ItemRepository itemRepository;
    private final ItemCategoryRepository itemCategoryRepository;
    private final ImageService imageService;


    @Transactional
    @Override
    public AuctionRoom createAuctionRoom(
        Member seller,
        AuctionCreateRequest request,
        MultipartFile auctionRoomImg,
        MultipartFile[] itemImgs
    )
        throws IOException {

        //시작시간 예외 검증
        LocalDateTime now = LocalDateTime.now();
        if (TimeUtility.toLocalDateTime(request.getStartedAt()).isBefore(now.plusHours(1))) {
            throw new AuctionStartTimeInvalidException();
        }

        // 아이템 검증
        List<ItemCreateRequest> itemCreateRequestList = request.getItemList();
        if (itemCreateRequestList.isEmpty()) {
            throw new EmptyItemListException();
        }

        // 이미지 수 검증
        if (request.getItemList().size() != itemImgs.length) {
            throw new RuntimeException("이미지 수 부족");
        }

        // 경매방 이미지, 경매방 생성
        Image savedAuctionRoomImg = imageService.uploadImage(auctionRoomImg);
        AuctionRoom auctionRoom = AuctionRoom.createAuctionRoom(
            request.getAuctionTitle(),
            seller,
            request.getAuctionRoomType(),
            request.getStartedAt(),
            savedAuctionRoomImg
        );
        AuctionRoom savedAuctionRoom = auctionRoomRepository.save(auctionRoom);

        // TODO 최적화 고민하기
        for (int i = 0; i < itemImgs.length; i++) {
            MultipartFile img = itemImgs[i];
            Image image = imageService.uploadImage(img);
            ItemCreateRequest itemCreateRequest = itemCreateRequestList.get(i);
            ItemCategory itemCategory = itemCategoryRepository.findById(
                itemCreateRequest.getItemCategory()).orElseThrow(RuntimeException::new);

            itemRepository.save(
                Item.create(
                    auctionRoom,
                    itemCreateRequest.getStartPrice(),
                    itemCreateRequest.getName(),
                    itemCreateRequest.getDescription(),
                    itemCategory,
                    itemCreateRequest.getOrdering(),
                    image
                )
            );
        }

        return savedAuctionRoom;
    }

    @Override
    public AuctionRoom readAuctionRoom(Long auctionId) {

        return auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);
    }

}
