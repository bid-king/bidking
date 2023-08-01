package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.AuctionListRequest;
import com.widzard.bidking.auction.dto.request.AuctionUpdateRequest;
import com.widzard.bidking.auction.dto.response.AuctionBookmarkResponse;
import com.widzard.bidking.auction.dto.response.AuctionRoomSellerResponse;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.exception.AuctionRoomNotFoundException;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.auction.exception.EmptyThumbnailException;
import com.widzard.bidking.auction.exception.ImageNotSufficientException;
import com.widzard.bidking.auction.repository.AuctionListSearch;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.bookmark.entity.Bookmark;
import com.widzard.bidking.bookmark.repository.BookmarkRepository;
import com.widzard.bidking.global.util.TimeUtility;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.service.ImageService;
import com.widzard.bidking.item.dto.request.ItemCreateRequest;
import com.widzard.bidking.item.dto.request.ItemUpdateRequest;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemCategory;
import com.widzard.bidking.item.exception.EmptyItemListException;
import com.widzard.bidking.item.exception.ItemCategoryNotFoundException;
import com.widzard.bidking.item.exception.ItemNotFoundException;
import com.widzard.bidking.item.repository.ItemCategoryRepository;
import com.widzard.bidking.item.repository.ItemRepository;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.orderItem.entity.OrderItem;
import com.widzard.bidking.orderItem.repository.OrderItemRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
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
@Transactional(readOnly = true)
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRoomRepository auctionRoomRepository;
    private final AuctionListSearch auctionListSearch;
    private final ItemRepository itemRepository;
    private final ItemCategoryRepository itemCategoryRepository;
    private final ImageService imageService;
    private final BookmarkRepository bookmarkRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public List<AuctionRoom> readAuctionRoomList(AuctionListRequest auctionListRequest) {
        return auctionListSearch.findAllBySearchCondition(auctionListRequest);
    }

    @Override
    public List<AuctionBookmarkResponse> readAuctionRoomListWithLoginStatus(
        AuctionListRequest auctionListRequest,
        Member member) {
        List<AuctionRoom> auctionRoomList = auctionListSearch.findAllBySearchCondition(
            auctionListRequest);
        List<AuctionBookmarkResponse> auctionBookmarkResponseList = new ArrayList<>();
        for (AuctionRoom auctionRoom : auctionRoomList
        ) {
            Optional<Bookmark> bookmark = bookmarkRepository.findBookmarkByMemberAndAuctionRoom(
                member, auctionRoom);

            if (bookmark.isPresent()) {
                auctionBookmarkResponseList.add(
                    AuctionBookmarkResponse.from(auctionRoom, bookmark.get()
                        .isAdded()));
            } else {
                auctionBookmarkResponseList.add(AuctionBookmarkResponse.from(auctionRoom, false));
            }
        }

        return auctionBookmarkResponseList;
    }

    @Override
    public List<AuctionRoom> readAuctionRoomListOnlyBookmarked(
        AuctionListRequest auctionListRequest,
        Member member) {
        return auctionListSearch.findAllBySearchConditionOnlyBookmarked(auctionListRequest, member);
    }

    @Override
    public Long getTotalBookmarkCount(Member member) {
        return bookmarkRepository.countBookmarkAllByMember(member);
    }

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
            throw new ImageNotSufficientException();
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
                    itemCreateRequest.getItemCategory())
                .orElseThrow(ItemCategoryNotFoundException::new);

            Item item = Item.create(
                itemCreateRequest.getStartPrice(),
                itemCreateRequest.getName(),
                itemCreateRequest.getDescription(),
                itemCategory,
                itemCreateRequest.getOrdering(),
                image
            );
            itemRepository.save(item);
            auctionRoom.addItem(item);
        }

        return savedAuctionRoom;
    }

    @Override
    public AuctionRoom readAuctionRoom(Long auctionId) {

        return auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);
    }


    @Override
    @Transactional
    public AuctionRoom updateAuctionRoom(
        Long auctionId,
        AuctionUpdateRequest req,
        MultipartFile auctionRoomImg,
        MultipartFile[] itemImgs
    ) throws IOException {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);
        //auctionRoom 기본자료형 필드 업데이트
        auctionRoom.update(req);

        //경매썸네일 변경 요청 존재
        if (!auctionRoomImg.isEmpty()) {
            Image auctionImage = auctionRoom.getImage();
            imageService.modifyImage(auctionRoomImg, auctionImage.getId());
        }

        //1. 옥션수정 - 아이템 삭제
        //옥션룸 신규 아이템 리스트
        List<ItemUpdateRequest> itemUpdateRequestList = req.getItemList();
        HashSet<Long> set = new HashSet<>();
        for (int i = 0; i < itemUpdateRequestList.size(); i++) {
            set.add(itemUpdateRequestList.get(i).getId());
        }
        //옥션룸의 기존 아이템리스트
        List<Item> itemList = auctionRoom.getItemList();
        for (int i = 0; i < itemList.size(); i++) {
            Item cur = itemList.get(i);
            //기존 아이템이 신규 아이템 리스트에 없으면 삭제
            if (!set.contains(cur.getId())) {
                auctionRoom.removeItem(cur);
                itemList = auctionRoom.getItemList();
                i--;
            }
        }

        //2. 아이템 신규 등록, 기존 아이템 수정
        for (int i = 0; i < itemUpdateRequestList.size(); i++) {
            int curOrdering = i + 1;

            ItemUpdateRequest updateRequest = itemUpdateRequestList.get(i);
            updateRequest.setOrdering(curOrdering);

            Long itemId = updateRequest.getId();
            //2-1 아이템 신규 등록(신규 등록인 아이템은 아이디가 null)
            if (itemId == null) {
                ItemCategory itemCategory = itemCategoryRepository.findById(
                        updateRequest.getItemCategoryId())
                    .orElseThrow(ItemCategoryNotFoundException::new);
                //TODO imageService.uploadImage(itemImgs[i])에서 itemImgs[i]가 null이어도 들어가나 확인
                Image image = imageService.uploadImage(itemImgs[i]);
                Item item = Item.create(updateRequest.getStartPrice(), updateRequest.getItemName()
                    , updateRequest.getDescription(), itemCategory, curOrdering,
                    image);
                itemRepository.save(item);
                item.registAuctionRoom(auctionRoom);
                //아이템 신규 등록 완료
                continue;
            }
            //2-2 아이템 수정
            Item item = itemRepository.findById(itemId).orElseThrow(ItemNotFoundException::new);
            ItemCategory category = itemCategoryRepository.findById(
                updateRequest.getItemCategoryId()).orElseThrow(
                ItemCategoryNotFoundException::new);
            item.update(updateRequest, category);

            MultipartFile curFileImg = itemImgs[i];
            //동일 인덱스의 사진이 null이면 썸네일 유지
            if (curFileImg.isEmpty()) {
                continue;
            }
            //썸네일 변경
            imageService.modifyImage(curFileImg, item.getImage().getId());
        }

        validAuctionRoom(auctionRoom);//정상 옥션룸인지 아이템 0개인지, 시작시간, 썸네일
        return auctionRoom;
    }

    @Override
    @Transactional
    public void deleteAuctionRoom(Long auctionId) {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);

        //s3에 올라가있는 image byte stream 삭제를 겸해야 하므로 cascade만으로 처리 불가
        //s3 옥션룸 썸네일 삭제
        imageService.deleteImage(auctionRoom.getImage());
        //s3 아이템 썸네일 삭제
        List<Item> itemList = auctionRoom.getItemList();
        for (int i = 0; i < itemList.size(); i++) {
            Item curItem = itemList.get(i);
            imageService.deleteImage(curItem.getImage());
        }
        auctionRoomRepository.deleteById(auctionId);
    }

    @Override
    public List<AuctionRoom> readAuctionOffLive(Member member) {
        List<AuctionRoom> auctionRoomList = auctionRoomRepository.findAllByAuctionRoomLiveStateAndSeller(
            member, AuctionRoomLiveState.OFF_LIVE);
        return auctionRoomList;

    }

    @Override
    public List<AuctionRoom> readAuctionBeforeLive(Member member) {
        List<AuctionRoom> auctionRoomList = auctionRoomRepository.findAllByAuctionRoomLiveStateAndSeller(
            member, AuctionRoomLiveState.BEFORE_LIVE);
        return auctionRoomList;
    }

    @Override
    public AuctionRoomSellerResponse readAuctionRoomSeller(Member member, Long auctionId) {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);


        return AuctionRoomSellerResponse.from(auctionRoom);
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
