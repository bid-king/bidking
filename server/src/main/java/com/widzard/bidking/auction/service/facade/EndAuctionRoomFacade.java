package com.widzard.bidking.auction.service.facade;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.widzard.bidking.auction.dto.redis.ItemAfterBidResult;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.auction.service.AuctionService;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.order.entity.Order;
import com.widzard.bidking.order.entity.OrderState;
import com.widzard.bidking.order.service.OrderService;
import java.time.LocalDateTime;
import java.util.List;
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
    private final OrderService orderService;
    private final ObjectMapper objectMapper;
    private final AuctionRoomRepository testRepository;

    public EndAuctionRoomFacade(
        AuctionService auctionService,
        AuctionRoomRepository testRepository,
        RedisTemplate<String, Object> redisTemplate,
        OrderService orderService,
        ObjectMapper objectMapper
    ) {
        this.hashOperations = redisTemplate.opsForHash();
        this.auctionService = auctionService;
        this.testRepository = testRepository;
        this.orderService = orderService;
        this.objectMapper = objectMapper;
    }

    public void saveItemAfterBidResult(Long auctionId, Long itemId, ItemAfterBidResult result) {
        hashOperations.put(
            "auction:" + auctionId + ":AfterBidResult",
            String.valueOf(itemId),
            result
        );
    }

    public ItemAfterBidResult getItemAfterBidResult(Long auctionId, Long itemId) {
        Object result = hashOperations.get(
            "auction:" + auctionId + ":AfterBidResult",
            String.valueOf(itemId)
        );
        return objectMapper.convertValue(result, ItemAfterBidResult.class);

    }

    @Transactional
    public void end(Long auctionId) {
        // 경매 검증 및 라이브 상태 변경
        AuctionRoom auctionRoom = auctionService.endAuctionRoom(auctionId);

        log.info("##########끝난 auctionRoom: {}", auctionRoom);
        // 해당 경매방에서 판매하는 아이템 리스트 조회
        List<Item> itemList = auctionRoom.getItemList();

        // 아이템 리스트 순회하며 낙찰/유찰 주문 생성
        for (Item item : itemList) {
            item.afterAuction();
            Long itemId = item.getId();
            log.info("##########끝난 auctionRoom{}의 itemId: {}", auctionId, itemId);
            ItemAfterBidResult bidResult = getItemAfterBidResult(auctionId, itemId);
            OrderState orderState;

            if (bidResult == null || bidResult.getType().equals("fail")) {
                orderState = OrderState.ORDER_FAILED;
                log.info("##########끝난 itemId orderState: {}:{}", itemId, orderState);

                // 유찰 주문 생성
                Order order = orderService.failOrder(
                    auctionId,
                    itemId
                );
                log.info("유찰 order = {}", order);
            } else {
                orderState = OrderState.PAYMENT_WAITING;
                log.info("##########끝난 itemId orderState: {}:{}", itemId, orderState);

                // 낙찰 주문 생성
                Order order = orderService.createOrder(
                    auctionId,
                    Long.parseLong(bidResult.getUserId()),
                    orderState, itemId,
                    Long.parseLong(bidResult.getPrice())
                );
                log.info("낙찰 order = {}", order);
            }

        }
    }

    // TODO node, client 개발테스트 완료 후 삭제 예정
    public void test(Long auctionId) {

        saveItemAfterBidResult(
            auctionId,
            1L,
            ItemAfterBidResult.builder()
                .type("success")
                .userId(1L)
                .nickname("천사")
                .price(10000L)
                .time(LocalDateTime.parse("2023-08-14T11:17:18"))
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
                .time(LocalDateTime.parse("2023-08-16T11:17:18"))
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
                .time(LocalDateTime.parse("2023-08-18T11:17:18"))
                .build()
        );

        ItemAfterBidResult bidResult = getItemAfterBidResult(auctionId, 5L);
        System.out.println("bidResult = " + bidResult);


    }
}
