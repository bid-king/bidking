package com.widzard.bidking.auction.service.facade;

import com.widzard.bidking.auction.dto.redis.ItemAfterBidResult;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.auction.service.AuctionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
public class EndAuctionRoomFacade {

    private final AuctionService auctionService;
    private final HashOperations<String, String, Object> hashOperations;
    private final AuctionRoomRepository testRepository;

    public EndAuctionRoomFacade(
        AuctionService auctionService,
        AuctionRoomRepository testRepository,
        RedisTemplate<String, Object> redisTemplate
    ) {
        this.hashOperations = redisTemplate.opsForHash();
        this.auctionService = auctionService;
        this.testRepository = testRepository;
    }

    // 데이터 저장
    public void saveItemAfterBidResult(Long auctionId, Long itemId, ItemAfterBidResult result) {
        hashOperations.put(
            "auction:" + auctionId + ":AfterBidResult",
            String.valueOf(itemId),
            result
        );
    }

    // 데이터 가져오기
    public ItemAfterBidResult getItemAfterBidResult(Long auctionId, Long itemId) {
        return (ItemAfterBidResult) hashOperations.get(
            "auction:" + auctionId + ":AfterBidResult",
            String.valueOf(itemId)
        );
    }

    @Transactional
    public void end(Long auctionId) {
        // 경매 검증 및 라이브 상태 변경
        AuctionRoom auctionRoom = auctionService.endAuctionRoom(auctionId);
        AuctionRoom build = AuctionRoom.builder().id(2L).build();

        // afterBidResult redis 보고 db 저장

        // order 생성
    }

    public void test(Long auctionId) {

        saveItemAfterBidResult(
            auctionId,
            1L,
            ItemAfterBidResult.builder()
                .type("success")
                .userId(1L)
                .nickname("천사")
                .price(10000L)
                .time("2023-08-14T11:17:18.3536262")
                .build()
        );

        saveItemAfterBidResult(
            auctionId,
            2L,
            ItemAfterBidResult.builder()
                .type("success")
                .userId(1L)
                .nickname("천사")
                .price(10000L)
                .time("2023-08-16T11:17:18.3536262")
                .build()
        );

        saveItemAfterBidResult(
            auctionId,
            3L,
            ItemAfterBidResult.builder()
                .type("fail")
                .build()
        );

        saveItemAfterBidResult(
            2L,
            3L,
            ItemAfterBidResult.builder()
                .type("success")
                .userId(2L)
                .nickname("천사2")
                .price(12000L)
                .time("2023-08-18T11:17:18.3536262")
                .build()
        );

        Long itemId = 1L;
        ItemAfterBidResult bidResult = getItemAfterBidResult(auctionId, itemId);
        System.out.println("bidResult = " + bidResult);


    }
}
