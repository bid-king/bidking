package com.widzard.bidking.auction.service.facade;

import com.widzard.bidking.auction.service.AuctionService;
import com.widzard.bidking.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class StartBiddingFacade {

    private final RedisTemplate<String, String> redisTemplate;
    private final AuctionService auctionService;

    @Transactional
    public void startBidding(Member member, Long auctionId, Long itemId) {
        // 경매 시작 처리 (member 검증 및 아이템, 경매방 상태 변경)
        Long startPrice = auctionService.startBidding(member, auctionId, itemId);
        // redis 저장
        
        // 갱신된 입찰가를 Redis 채널에 발행(Publish)
        redisTemplate.convertAndSend(
            "StartAuctionItem",
            auctionId + ":" + itemId + ":" + startPrice
        );
    }

}
