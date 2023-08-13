package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.AuctionRoomEnterDto;
import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.AuctionListRequest;
import com.widzard.bidking.auction.dto.request.AuctionUpdateRequest;
import com.widzard.bidking.auction.dto.response.AuctionBookmarkResponse;
import com.widzard.bidking.auction.dto.response.AuctionRoomSellerResponse;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.exception.AuctionRoomNotFoundException;
import com.widzard.bidking.auction.exception.AuctionRoomNotStartedException;
import com.widzard.bidking.auction.exception.AuctionStartTimeInvalidException;
import com.widzard.bidking.auction.exception.InvalidAuctionRoomRequestException;
import com.widzard.bidking.auction.exception.UnableToDeleteAuctionNow;
import com.widzard.bidking.auction.exception.UnableToUpdateAuctionNow;
import com.widzard.bidking.auction.exception.UnauthorizedAuctionRoomAccessException;
import com.widzard.bidking.auction.repository.AuctionListSearch;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.bookmark.entity.Bookmark;
import com.widzard.bidking.bookmark.repository.BookmarkRepository;
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
import com.widzard.bidking.member.exception.MemberNotFoundException;
import com.widzard.bidking.member.repository.MemberRepository;
import com.widzard.bidking.order.entity.OrderItem;
import com.widzard.bidking.order.repository.OrderItemRepository;
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
    private final MemberRepository memberRepository;

    @Override
    public List<AuctionRoom> readAuctionRoomList(AuctionListRequest auctionListRequest) {
        List<ItemCategory> itemCategoryList = itemCategoryRepository.findAllById(
            auctionListRequest.getCategoryList());
        return auctionListSearch.findAllBySearchCondition(auctionListRequest, itemCategoryList);
    }

    @Override
    public List<AuctionBookmarkResponse> readAuctionRoomListWithLoginStatus(
        AuctionListRequest auctionListRequest,
        Member member) {
        List<ItemCategory> itemCategoryList = itemCategoryRepository.findAllById(
            auctionListRequest.getCategoryList());
        List<AuctionRoom> auctionRoomList = auctionListSearch.findAllBySearchCondition(
            auctionListRequest, itemCategoryList);
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
        List<ItemCategory> itemCategoryList = itemCategoryRepository.findAllById(
            auctionListRequest.getCategoryList());
        return auctionListSearch.findAllBySearchConditionOnlyBookmarked(auctionListRequest, member,
            itemCategoryList);
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
        if (request.getStartedAt().isBefore(now.plusHours(1))) {
            throw new AuctionStartTimeInvalidException();
        }

        // 아이템 검증
        List<ItemCreateRequest> itemCreateRequestList = request.getItemList();
        if (itemCreateRequestList == null || itemCreateRequestList.isEmpty()) {
            throw new EmptyItemListException();
        }

        // 이미지 수 검증
        if (request.getItemList().size() != itemImgs.length) {
            throw new InvalidAuctionRoomRequestException();
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
                savedAuctionRoom,
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
        Member member,
        Long auctionId,
        AuctionUpdateRequest req,
        MultipartFile auctionRoomImg,
        MultipartFile[] itemImgs
    ) throws IOException {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);
        //시작시간이 20분이하로 남은경우 수정 불가능
        LocalDateTime auctionStartTime = auctionRoom.getStartedAt();
        LocalDateTime twentyMinutesAgo = LocalDateTime.now().minusMinutes(20);
        if (auctionStartTime.isBefore(twentyMinutesAgo) || auctionStartTime.isEqual(twentyMinutesAgo)) {
            throw new UnableToUpdateAuctionNow();
        }
        log.info("auctionRoom ItemList={}", auctionRoom.getItemList().toString());
        //auctionRoom 기본자료형 필드 업데이트
        auctionRoom.update(req);

        //경매방 소유권 검사
        checkOwner(member, auctionRoom);

        //경매썸네일 변경 요청 존재
        if (auctionRoomImg != null && !auctionRoomImg.isEmpty()) {
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
        int imageCnt = 0;
        for (int i = 0; i < itemUpdateRequestList.size(); i++) {
            int curOrdering = i + 1;

            ItemUpdateRequest updateRequest = itemUpdateRequestList.get(i);
            updateRequest.setOrdering(curOrdering);
            log.info("isChanged={}", updateRequest.toString());
            Long itemId = updateRequest.getId();
            //2-1 아이템 신규 등록(신규 등록인 아이템은 아이디가 null)
            if (itemId == null) {
                ItemCategory itemCategory = itemCategoryRepository.findById(
                        updateRequest.getItemCategoryId())
                    .orElseThrow(ItemCategoryNotFoundException::new);
                Image image = imageService.uploadImage(itemImgs[imageCnt++]);
                Item item = Item.create(auctionRoom, updateRequest.getStartPrice(),
                    updateRequest.getItemName()
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

            //이미지 변경 요청 false
            if (!updateRequest.getIsChanged()) {
                continue;
            }
            //썸네일 변경
            MultipartFile curFileImg = itemImgs[imageCnt++];
            log.info("file={}", curFileImg.toString());
            imageService.modifyImage(curFileImg, item.getImage().getId());
        }
        auctionRoom.isValid();
        return auctionRoom;
    }

    @Override
    @Transactional
    public void deleteAuctionRoom(
        Member member,
        Long auctionId
    ) {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);

        //시작시간이 20분이하로 남은경우 삭제 불가능
        LocalDateTime auctionStartTime = auctionRoom.getStartedAt();
        LocalDateTime twentyMinutesAgo = LocalDateTime.now().minusMinutes(20);
        if (auctionStartTime.isBefore(twentyMinutesAgo) || auctionStartTime.isEqual(twentyMinutesAgo)) {
            throw new UnableToDeleteAuctionNow();
        }

        //경매방 소유권 검사
        checkOwner(member, auctionRoom);

        //북마크 삭제
        List<Optional<Bookmark>> bookmarkList = bookmarkRepository.findBookmarkByAuctionRoom(
            auctionRoom);

        for (Optional<Bookmark> bookmark : bookmarkList
        ) {
            if (bookmark.isPresent()) {
                bookmarkRepository.deleteById(bookmark.get().getId());
            }
        }

        //경매방 삭제
        auctionRoomRepository.deleteById(auctionId);

        //s3에 올라가있는 image byte stream 삭제를 겸해야 하므로 cascade만으로 처리 불가
        //s3 옥션룸 썸네일 삭제
        imageService.deleteImage(auctionRoom.getImage());
        //s3 아이템 썸네일 삭제
        List<Item> itemList = auctionRoom.getItemList();
        for (int i = 0; i < itemList.size(); i++) {
            Item curItem = itemList.get(i);
            imageService.deleteImage(curItem.getImage());
        }
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
        AuctionRoom auctionRoom = auctionRoomRepository.findOffLiveById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);
        if (!auctionRoom.getSeller().equals(member)) {
            throw new UnauthorizedAuctionRoomAccessException();
        }
        List<OrderItem> orderItemList = orderItemRepository.findOrderItemsByAuctionRoom(
            auctionRoom);
        log.info("orderItemList = {}", orderItemList);

        return AuctionRoomSellerResponse.from(auctionRoom, orderItemList);
    }

    @Transactional
    @Override
    public AuctionRoomEnterDto validateEnterRoom(Member member, Long auctionId) {
        // 1. 사용자 및 경매방 검증
        // 1) 현재 판매자가 생성한 경매가 있는지 검증 (판매자인지 아닌지 여부 결정)
        // 2) 해당 경매가 아직 진행되지 않은 경매인가 (이미 시작했던 / 끝난 경매방인지)
        // 3) 경매방이 시작될 수 있는 시간인가 (경매방 시작시간 20분전부터 해당 시간까지)
        boolean isSeller = true;

        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);
        log.info("memberId: {}", member.getId());
        log.info("sellerId: {}", auctionRoom.getSeller().getId());

        if (auctionRoom.getSeller().getId() != member.getId()) {
            isSeller = false;
            if (!auctionRoom.getAuctionRoomLiveState().equals(AuctionRoomLiveState.ON_LIVE)) {
                throw new AuctionRoomNotStartedException();
            }
        } else {
            auctionRoom.validateLive();
            // 2. 경매방 라이브로 상태 변경
            auctionRoom.changeOnLive();
            log.info("시작할 경매방 pk: {}", auctionRoom.getId());
        }

        log.info("해당 방을 생성한 판매자인가: {}", isSeller);
        // 3. 결과 반환
        return new AuctionRoomEnterDto(
            isSeller,
            auctionId,
            member.getNickname(),
            auctionRoom.getAuctionRoomType(),
            auctionRoom.getName()
        );
    }

    @Override
    public AuctionRoom getLiveAuctionItemList(Long auctionId) {
        return auctionRoomRepository.findById(auctionId)
            .orElseThrow(AuctionRoomNotFoundException::new);
    }

    @Transactional
    @Override
    public void startBidding(Member member, Long auctionId, Long itemId) {
        // 1. 사용자/경매방 검증
        // 2. 경매 진행될 수 있는 아이템 검증
        // 3. 해당 아이템 경매 진행으로 변경
        // 4. 경매 진행 첫번째 상품이면 tradestate => in progress로 상태 변경
        AuctionRoom auctionRoom = auctionRoomRepository.findByIdAndMember(auctionId, member)
            .orElseThrow(AuctionRoomNotFoundException::new);

        Item item = itemRepository.findById(itemId).orElseThrow(ItemNotFoundException::new);


    }

    private void checkOwner(Member member, AuctionRoom auctionRoom) {
        Member loginMember = memberRepository.findById(member.getId()).orElseThrow(
            MemberNotFoundException::new);
        Member seller = memberRepository.findById(auctionRoom.getSeller().getId())
            .orElseThrow(MemberNotFoundException::new);
        if (loginMember != seller) {
            throw new UnauthorizedAuctionRoomAccessException();
        }
    }
}
