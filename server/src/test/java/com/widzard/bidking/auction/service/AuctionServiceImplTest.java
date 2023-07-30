package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.AuctionListRequest;
import com.widzard.bidking.auction.dto.request.AuctionUpdateRequest;
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
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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

    //테스트용 전역객체 공간 끝


    @BeforeEach
    private void basicSetting() {
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
            .name("테스트용 아이템1")
            .startPrice(0L)
            .build();
        ItemCreateRequest itemReq2 = ItemCreateRequest.builder()
            .itemCategory(itemCategory.getId())
            .description("테스트용 아이템 설명2")
            .ordering(2)
            .name("테스트용 아이템2")
            .startPrice(10L)
            .build();

        List<ItemCreateRequest> itemCreateRequestList = new ArrayList<>();
        itemCreateRequestList.add(itemReq1);
        itemCreateRequestList.add(itemReq2);

        auctionCreateRequest = AuctionCreateRequest.builder()
            .auctionTitle("테스트용 경매방 제목")
            .auctionRoomType(AuctionRoomType.GENERAL)//일반경매
            .startedAt("2023-09-15 00:00:00")
            .itemPermissionChecked(true)
            .itemList(itemCreateRequestList)
            .build();
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
            .startedAt("2023-12-12 00:00:00")
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
    void readAuctionRoomList() throws IOException{
        List<Long> categoryList = new ArrayList<>();
        categoryList.add(1L);

        //1번 카테고리를 갖는 옥션룸
        auctionListRequest = AuctionListRequest.builder()
            .categoryList(categoryList)
            .page(1)
            .perPage(1)
            .build();

        AuctionRoom create = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImg);
        AuctionRoom find = auctionService.readAuctionRoom(create.getId());
        log.info("created auctionRoom's itemList = {}", find.getItemList());

        List<AuctionRoom> auctionRoomList = auctionService.readAuctionRoomList(auctionListRequest);
        log.info("searched auctionRoom's itemList = {}", find.getItemList());

        Assertions.assertEquals(auctionRoomList.get(0), find);
    }

    //TODO itemList를 빈 리스트로 update 요청시 아이템 에러 발생

    //TODO 시작시간을 현재시간 1시간 이내로 설정시 시간 에러 발생
}