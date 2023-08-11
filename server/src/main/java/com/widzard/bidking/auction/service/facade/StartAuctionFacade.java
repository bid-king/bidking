package com.widzard.bidking.auction.service.facade;

import com.widzard.bidking.auction.service.AuctionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class StartAuctionFacade { // 테스트

    private final RedisTemplate<String, String> redisTemplate;
    public void updateAuctionPrice(Long itemId, Long newPrice) {
        // 갱신된 입찰가를 Redis 채널에 발행(Publish)
        redisTemplate.convertAndSend("auction-updates", 1 + ":" + itemId + ":" + newPrice);
    }
}
