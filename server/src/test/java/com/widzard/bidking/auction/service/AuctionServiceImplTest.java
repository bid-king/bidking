package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.AuctionListRequest;
import com.widzard.bidking.auction.dto.request.AuctionUpdateRequest;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.item.dto.request.ItemCreateRequest;
import com.widzard.bidking.item.dto.request.ItemUpdateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomType;
import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.repository.ImageRepository;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.entity.ItemCategory;
import com.widzard.bidking.item.repository.ItemCategoryRepository;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.entity.MemberRole;
import com.widzard.bidking.member.repository.MemberRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@SpringBootTest
@Slf4j
class AuctionServiceImplTest {

    @Autowired
    AuctionService auctionService;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    ItemCategoryRepository itemCategoryRepository;

    //테스트용 전역객체 공간 시작
    private Member member;
    private ItemCategory itemCategory;
    private ItemCategory itemCategory2;
    //목업객체 대입
    //목업 - 옥션룸 썸네일
    private MultipartFile auctionRoomImg = new MockMultipartFile("mockFileName",
        "mockOriginalFileName", "mockFileContentType", "mockFileBytes".getBytes());
    //목업 - 아이템 썸네일 (아이템2개)
    private MultipartFile[] itemImg = new MockMultipartFile[]{
        new MockMultipartFile("mockItemFileName1", "mockItemOriginalFilename1",
            "mockItemFileContentType1", "mockItemFileBytes1".getBytes()),
        new MockMultipartFile("mockItemFileName2", "mockItemOriginalFilename2",
            "mockItemFileContentType2", "mockItemFileBytes2".getBytes())
    };


    //업데이트용 목업객체 대입
    //목업 - 옥션룸 썸네일
    private MultipartFile auctionRoomImg2 = new MockMultipartFile("changeDmockFileName",
        "changeDmockOriginalFileName", "mockFileContentType", "mockFileBytes".getBytes());
    //목업 - 아이템 썸네일 (아이템2개)
    private MultipartFile[] itemImg2 = new MockMultipartFile[]{
        new MockMultipartFile("changeDmockItemFileName1", "changeDmockItemOriginalFilename1",
            "mockItemFileContentType1", "mockItemFileBytes1".getBytes()),
        new MockMultipartFile("changeDmockItemFileName2", "changeDmockItemOriginalFilename2",
            "mockItemFileContentType2", "mockItemFileBytes2".getBytes())
    };


    //옥션룸 생성요청(BeforeEach에서 초기화)
    private AuctionCreateRequest auctionCreateRequest;
    private AuctionListRequest auctionListRequest;
    private AuctionListRequest auctionListRequest2;
    private AuctionRoom create, create1, create2, find;

    //테스트용 전역객체 공간 끝


    @BeforeEach
    private void basicSetting() throws IOException {
        //기본카테고리
        itemCategory = ItemCategory.builder()
            .name("전자기기")
            .build();
        itemCategoryRepository.save(itemCategory);
        itemCategory2 = ItemCategory.builder()
            .name("의류")
            .build();
        itemCategoryRepository.save(itemCategory2);

        //기본이미지 - 아래 Member에서 Cascade로 영속화
        Image image = Image.builder()
            .fileName("tempImg")
            .filePath("temp/img/url")
            .originalFileName("original File name")
            .build();

        //기본멤버
        member = Member.builder()
            .image(image)
            .memberRole(MemberRole.USER)
            .address(new Address("도도", "리아", "도도리아"))
            .available(true)
            .nickname("김닉넴")
            .penalty(0)
            .password("tempPassword")
            .userId("UserLoginId")
            .build();
        memberRepository.save(member);

        ItemCreateRequest itemReq1 = ItemCreateRequest.builder()
            .itemCategory(itemCategory.getId())
            .description("테스트용 아이템 설명1")
            .ordering(1)
            .name("테스트용 아이템 이름1")
            .startPrice(0L)
            .build();
        ItemCreateRequest itemReq2 = ItemCreateRequest.builder()
            .itemCategory(itemCategory.getId())
            .description("테스트용 아이템 설명2")
            .ordering(2)
            .name("테스트용 아이템 이름2")
            .startPrice(10L)
            .build();

        List<ItemCreateRequest> itemCreateRequestList = new ArrayList<>();
        itemCreateRequestList.add(itemReq1);
        itemCreateRequestList.add(itemReq2);

        auctionCreateRequest = AuctionCreateRequest.builder()
            .auctionTitle("테스트용 경매방 제목")
            .auctionRoomType(AuctionRoomType.COMMON)//일반경매
            .startedAt(LocalDateTime.parse("2023-09-15T00:00:00"))
            .itemPermissionChecked(true)
            .itemList(itemCreateRequestList)
            .build();

        create = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        find = auctionService.readAuctionRoom(create.getId());
        log.info("created auctionRoom's itemList = {}", find);
    }

    @Test
    void createAuctionRoom() throws IOException {
        log.info("auctionCreateRequest.itemlist() = {} ", auctionCreateRequest.getItemList());
        AuctionRoom auctionRoom = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        log.info("created auctionRoom's itemList = {}", auctionRoom.getItemList());
        log.info("생성된 옥션룸 = {}", auctionRoom.getName());
    }

    @Test
    void readAuctionRoom() throws IOException {
        AuctionRoom create = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        AuctionRoom find = auctionService.readAuctionRoom(create.getId());

        Assertions.assertEquals(create, find);

    }

    @Test
    void updateAuctionRoom() throws IOException {

        AuctionRoom create = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        AuctionRoom find = auctionService.readAuctionRoom(create.getId());
        log.info("create == find {}", create == find);
        find.getItemList().forEach(item -> {
            log.info("yayaho {}", item.toString());
        });
        //auctionRoom에 있는 itemList를 이용해서 임시 itemUpdateRequest 객체 생성
        List<ItemUpdateRequest> itemUpdateRequestList = new ArrayList<>();
        List<Item> itemList = create.getItemList();
        itemList.forEach(item -> {
            log.info("inserting id is {}", item.getId());
            ItemUpdateRequest req = ItemUpdateRequest.builder()
                .id(item.getId())
                .itemName(item.getName() + "changed")
                .ordering(item.getOrdering())
                .itemCategoryId(itemCategory2.getId())//TODO 카테고리 따로
                .description(item.getDescription())
                .startPrice(item.getStartPrice())
                .build();
            itemUpdateRequestList.add(req);
        });

        AuctionUpdateRequest req = AuctionUpdateRequest.builder()
            .auctionRoomType(AuctionRoomType.REVERSE)
            .deliveryRulesChecked(true)
            .auctionTitle("changed title")
            .itemPermissionChecked(true)
            .startedAt(LocalDateTime.parse("2023-12-12T00:00:00"))
            .itemList(itemUpdateRequestList)
            .build();
        log.info("before changed = {}", find);
        AuctionRoom auctionRoom = auctionService.updateAuctionRoom(find.getId(), req,
            auctionRoomImg2, itemImg2);
        log.info("after changed = {}", find);

        Assertions.assertEquals(auctionRoom.getAuctionRoomType(), AuctionRoomType.REVERSE);
        auctionRoom.getItemList().forEach(item -> {
            Assertions.assertTrue(item.getName().contains("changed"));
        });
    }

    @Test
    @Disabled
    void readAuctionRoomListByCategory() throws IOException {
        List<Long> categoryList = new ArrayList<>();
        categoryList.add(1L);

        List<Long> categoryList2 = new ArrayList<>();
        categoryList2.add(2L);

        //1번 카테고리를 갖는 옥션룸 요청
        auctionListRequest = AuctionListRequest.builder()
            .categoryList(categoryList)
            .page(1)
            .perPage(1)
            .build();

        //2번 카테고리를 갖는 옥션룸 요청
        auctionListRequest2 = AuctionListRequest.builder()
            .categoryList(categoryList2)
            .page(1)
            .perPage(1)
            .build();

        //생성
        log.info("created auctionRoom's itemList = {}", find);
        //전자 기기 검색
        List<AuctionRoom> auctionRoomList = auctionService.readAuctionRoomList(auctionListRequest);
        log.info("searched auctionRoom's itemList = {}", auctionRoomList.get(0).getItemList());

        Assertions.assertEquals(auctionRoomList.get(0).getId(), find.getId());

        //의류 검색
        List<AuctionRoom> auctionRoomList2 = auctionService.readAuctionRoomList(
            auctionListRequest2);
        log.info("searched auctionRoom's List2 = {}", auctionRoomList2);

        Assertions.assertThrows(IndexOutOfBoundsException.class, () -> {
            AuctionRoom auctionRoom = auctionRoomList2.get(0);
        });

    }

    @Test
    void readAuctionRoomListByKeyword() throws IOException {
        List<Long> categoryList = new ArrayList<>();
        categoryList.add(1L);

        List<Long> categoryList2 = new ArrayList<>();
        categoryList2.add(2L);

        //생성
        log.info("created auctionRoom's itemList = {}", find);
        //"테스트" 검색
        AuctionListRequest auctionListRequest3 = AuctionListRequest.builder()
            .keyword("테스트")
            .page(1)
            .perPage(1)
            .build();

        List<AuctionRoom> auctionRoomList3 = auctionService.readAuctionRoomList(
            auctionListRequest3);
        log.info("searched auctionRoom's itemList3 = {}", auctionRoomList3.get(0).getItemList());

        Assertions.assertNotEquals(auctionRoomList3, find);

        //"aa" 검색
        AuctionListRequest auctionListRequest4 = AuctionListRequest.builder()
            .keyword("aa")
            .page(1)
            .perPage(1)
            .build();

        List<AuctionRoom> auctionRoomList4 = auctionService.readAuctionRoomList(
            auctionListRequest4);
        Assertions.assertThrows(IndexOutOfBoundsException.class, () -> {
            AuctionRoom auctionRoom = auctionRoomList4.get(0);
        });
    }

    @Test
    @Disabled
    void readAuctionRoomListBySearchCondition() throws IOException {
        List<Long> categoryList = new ArrayList<>();
        categoryList.add(1L);

        List<Long> categoryList2 = new ArrayList<>();
        categoryList2.add(2L);

        List<Long> categoryList3 = new ArrayList<>();

        //1번 카테고리를 갖는 옥션룸 요청
        auctionListRequest = AuctionListRequest.builder()
            .categoryList(categoryList)
            .keyword("테스트")
            .page(1)
            .perPage(2)
            .build();

        //2번 카테고리를 갖는 옥션룸 요청
        auctionListRequest2 = AuctionListRequest.builder()
            .categoryList(categoryList2)
            .keyword("테스트")
            .page(1)
            .perPage(1)
            .build();

        //3번
        AuctionListRequest auctionListRequest3 = AuctionListRequest.builder()
            .categoryList(categoryList3)
            .page(1)
            .perPage(3)
            .build();

        //생성
        log.info("created auctionRoom's itemList = {}", find);

        //전자 기기 & 테스트 검색
        List<AuctionRoom> auctionRoomList = auctionService.readAuctionRoomList(auctionListRequest);
        log.info("searched auctionRoom's itemList = {}", auctionRoomList);
        log.info("auctionRoom's size={}", auctionRoomList.size());
        Assertions.assertEquals(auctionRoomList.get(0).getId(), find.getId());

        //의류 & 테스트 검색
        List<AuctionRoom> auctionRoomList2 = auctionService.readAuctionRoomList(
            auctionListRequest2);
        log.info("searched auctionRoom's List2 = {}", auctionRoomList2);

        Assertions.assertThrows(IndexOutOfBoundsException.class, () -> {
            AuctionRoom auctionRoom = auctionRoomList2.get(0);
        });

        //조건 없는 검색
        List<AuctionRoom> auctionRoomList3 = auctionService.readAuctionRoomList(
            auctionListRequest3);
        log.info("searched auctionRoom's itemList3 = {}", auctionRoomList3);
        log.info("auctionRoom's size={}", auctionRoomList3.size());
//        Assertions.assertEquals(auctionRoomList3.get(0).getId(), find.getId());

    }

    @Test
    void readAuctionRoomListByLiveStatus() throws IOException {
        List<Long> categoryList = new ArrayList<>();
        categoryList.add(1L);

        List<Long> categoryList2 = new ArrayList<>();
        categoryList2.add(2L);

        //1번 카테고리를 갖는 옥션룸 요청
        auctionListRequest = AuctionListRequest.builder()
            .categoryList(categoryList)
            .keyword("테스트")
            .page(1)
            .perPage(1)
            .build();

        //생성
        log.info("created auctionRoom's itemList = {}", find);
        //change live state
        find.changeLiveState(AuctionRoomLiveState.OFF_LIVE);
        log.info("created auctionRoom's itemList = {}", find.getItemList());

        //전자 기기 & 테스트 검색
        List<AuctionRoom> auctionRoomList = auctionService.readAuctionRoomList(auctionListRequest);
        log.info("searched auctionRoom's itemList = {}", auctionRoomList);
        log.info("auctionRoom's size={}", auctionRoomList.size());

        Assertions.assertThrows(IndexOutOfBoundsException.class, () -> {
            AuctionRoom auctionRoom = auctionRoomList.get(0);
        });
    }

    @Test
    @Disabled
    void readAuctionRoomListByItemNameAndItemDescription() throws IOException {
        List<Long> categoryList = new ArrayList<>();
        categoryList.add(1L);

        //1번 카테고리를 갖는 옥션룸 요청
        AuctionListRequest auctionListRequest = AuctionListRequest.builder()
            .categoryList(categoryList)
            .keyword("테스트")
            .page(1)
            .perPage(1)
            .build();

        AuctionListRequest auctionListRequest1 = AuctionListRequest.builder()
            .categoryList(categoryList)
            .keyword("설명")
            .page(1)
            .perPage(1)
            .build();

        AuctionListRequest auctionListRequest2 = AuctionListRequest.builder()
            .categoryList(categoryList)
            .keyword("이름")
            .page(1)
            .perPage(1)
            .build();

        //생성
        log.info("created auctionRoom's itemList = {}", find);

        //전자 기기 & 테스트 검색 ( 옥션룸 제목 )
        List<AuctionRoom> auctionRoomList = auctionService.readAuctionRoomList(auctionListRequest);
        log.info("searched auctionRoom's itemList = {}", auctionRoomList);
        log.info("auctionRoom's size={}", auctionRoomList.size());
        Assertions.assertEquals(auctionRoomList.get(0).getName(),
            find.getName());

        //전자 기기 & 테스트 검색 ( 아이템 설명 )
        List<AuctionRoom> auctionRoomList1 = auctionService.readAuctionRoomList(
            auctionListRequest1);
        log.info("searched auctionRoom's itemList = {}", auctionRoomList1);
        log.info("auctionRoom's size={}", auctionRoomList1.size());
        Assertions.assertEquals(auctionRoomList1.get(0).getItemList().get(0).getDescription(),
            find.getItemList().get(0).getDescription());

        //전자 기기 & 테스트 검색 ( 아이템 이름 )
        List<AuctionRoom> auctionRoomList2 = auctionService.readAuctionRoomList(
            auctionListRequest2);
        log.info("searched auctionRoom's itemList = {}", auctionRoomList2);
        log.info("auctionRoom's size={}", auctionRoomList2.size());
        Assertions.assertEquals(auctionRoomList2.get(0).getItemList().get(0).getName(),
            find.getItemList().get(0).getName());
    }

    @Test
    void readAuctionRoomListByStartTime() throws IOException {
        List<Long> categoryList = new ArrayList<>();
        categoryList.add(1L);

        //1번 카테고리를 갖는 옥션룸 요청
        auctionListRequest = AuctionListRequest.builder()
            .categoryList(categoryList)
            .keyword("테스트")
            .page(1)
            .perPage(3)
            .build();

        //생성
        AuctionRoom create = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        AuctionRoom create1 = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        AuctionRoom create2 = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        AuctionRoom find = auctionService.readAuctionRoom(create.getId());
        log.info("created auctionRoom's itemList = {}", find.getItemList());

        //chage startedAt (default : 2023-09-15 00:00:00)
        create1.changeStartedAt(LocalDateTime.parse("2023-09-14T00:00:00"));
        create2.changeStartedAt(LocalDateTime.parse("2023-09-13T00:00:00"));

        //전자 기기 & 테스트 검색 ( 옥션룸 제목 )
        List<AuctionRoom> auctionRoomList = auctionService.readAuctionRoomList(auctionListRequest);
        log.info("searched auctionRoom's itemList = {}", auctionRoomList);
        log.info("auctionRoom's size={}", auctionRoomList.size());
//        Assertions.assertEquals(auctionRoomList.get(0).getId(), find.getId());
    }

    @Test
    void readAuctionRoomListByBookmark() throws IOException {
        List<Long> categoryList = new ArrayList<>();
        categoryList.add(1L);

        //1번 카테고리를 갖는 옥션룸 요청
        auctionListRequest = AuctionListRequest.builder()
            .categoryList(categoryList)
            .keyword("테스트")
            .page(1)
            .perPage(3)
            .build();
        // 기본 멤버 = member

        //생성
        AuctionRoom create = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        AuctionRoom create1 = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        AuctionRoom create2 = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        AuctionRoom find = auctionService.readAuctionRoom(create.getId());
        log.info("created auctionRoom's itemList = {}", find.getItemList());

        //chage startedAt (default : 2023-09-15 00:00:00)
        create1.changeStartedAt(LocalDateTime.parse("2023-09-14T00:00:00"));
        create2.changeStartedAt(LocalDateTime.parse("2023-09-13T00:00:00"));

        //전자 기기 & 테스트 검색 ( 옥션룸 제목 )
        List<AuctionRoom> auctionRoomList = auctionService.readAuctionRoomList(auctionListRequest);
        log.info("searched auctionRoom's itemList = {}", auctionRoomList);
        log.info("auctionRoom's size={}", auctionRoomList.size());
//        Assertions.assertEquals(auctionRoomList.get(0).getId(), find.getId());
    }

    //TODO itemList를 빈 리스트로 update 요청시 아이템 에러 발생

    //TODO 시작시간을 현재시간 1시간 이내로 설정시 시간 에러 발생
}