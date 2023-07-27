package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.AuctionUpdateRequest;
import com.widzard.bidking.auction.dto.request.ItemCreateRequest;
import com.widzard.bidking.auction.dto.request.ItemUpdateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.exception.AuctionRoomNotFoundException;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.auction.exception.EmptyThumbnailException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.global.util.TimeUtility;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.service.ImageService;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemCategory;
import com.widzard.bidking.item.exception.EmptyItemListException;
import com.widzard.bidking.item.exception.ItemCategoryNotFoundException;
import com.widzard.bidking.item.exception.ItemNotFoundException;
import com.widzard.bidking.item.repository.ItemCategoryRepository;
import com.widzard.bidking.item.repository.ItemRepository;
import com.widzard.bidking.member.entity.Member;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
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
        if (itemCreateRequestList == null || itemCreateRequestList.isEmpty()) {
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
            log.info("itemCreateRequest == {}", itemCreateRequest);
            ItemCategory itemCategory = itemCategoryRepository.findById(
                itemCreateRequest.getItemCategory()).orElseThrow(RuntimeException::new);

            //Item 생성이 안되는 듯 하여 확인
            Item item = Item.create(
//                auctionRoom,
                itemCreateRequest.getStartPrice(),
                itemCreateRequest.getName(),
                itemCreateRequest.getDescription(),
                itemCategory,
                itemCreateRequest.getOrdering(),
                image
            );
            log.info("확인용 id = {}", item);
            itemRepository.save(item);
            auctionRoom.addItem(item);
            log.info("아이템에서 옭션룸 {}", item.getAuctionRoom().getName());
        }

        log.info("TEST true {}", auctionRoom == savedAuctionRoom);
        log.info("NUll 시작 추정 0지점 = {}", auctionRoom.getItemList());
        return savedAuctionRoom;
    }

    @Override
    public AuctionRoom readAuctionRoom(Long auctionId) {

        return auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);
    }


    @Override
    @Transactional
    public AuctionRoom updateAuctionRoom(Long auctionId, AuctionUpdateRequest req,
        MultipartFile auctionRoomImg, MultipartFile[] itemImgs) throws IOException {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);
        //auctionRoom 기본자료형 필드 업데이트
        auctionRoom.update(req);

        //경매썸네일 변경 요청 존재
        if (!auctionRoomImg.isEmpty()) {
            Image auctionImage = auctionRoom.getImage();
            imageService.modifyImage(auctionRoomImg, auctionImage.getId());
        }

        //아이템 리스트 업데이트
        List<ItemUpdateRequest> itemUpdateRequestList = req.getItemList();
        log.info("itemUpdatearequestList.size = {}", itemUpdateRequestList.size());
        for (ItemUpdateRequest updateRequest : itemUpdateRequestList) {
            Long itemId = updateRequest.getId();
            log.info("item null start point {}", itemId);
            Item item = itemRepository.findById(itemId).orElseThrow(ItemNotFoundException::new);
            ItemCategory category = itemCategoryRepository.findById(
                updateRequest.getItemCategoryId()).orElseThrow(
                ItemCategoryNotFoundException::new);
            item.update(updateRequest, category);
            log.info("updateRequest.getItemCategoryId() {}", updateRequest.getItemCategoryId());
        }

        //아읻템 이미지 업데이트
//        itemImgs에서 null(isEmpty())이면 냅둬야한다(노변경)
        for (int i = 0; i < itemImgs.length; i++) {
            MultipartFile curFileImg = itemImgs[i];

            if (curFileImg.isEmpty()) {
                continue;
            }

            //썸네일 변경 신청한 아이템
            Item curItem = auctionRoom.getItemList().get(i);
            imageService.modifyImage(curFileImg, curItem.getImage().getId());
        }

        validAuctionRoom(auctionRoom);//정상 옥션룸인지 아이템 0개인지, 시작시간, 썸네일
        return auctionRoom;
    }

    //도우미 함수
    private void validAuctionRoom(AuctionRoom auctionRoom) {
        //아이템 갯수
        List<Item> itemList = auctionRoom.getItemList();
        if (itemList == null || itemList.size() == 0) {
            throw new EmptyItemListException();
        }
        //시작시간
        LocalDateTime now = LocalDateTime.now();
        if (TimeUtility.toLocalDateTime(auctionRoom.getStartedAt()).isBefore(now.plusHours(1))) {
            throw new AuctionStartTimeInvalidException();
        }
        //썸네일유무
        if (auctionRoom.getImage() == null) {
            throw new EmptyThumbnailException();
        }
        //
    }

}
