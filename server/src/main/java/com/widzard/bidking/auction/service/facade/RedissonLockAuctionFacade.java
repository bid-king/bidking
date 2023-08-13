package com.widzard.bidking.auction.service.facade;

import com.widzard.bidking.auction.service.BiddingService;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedissonLockAuctionFacade {

    private final RedisTemplate<String, Object> redisTemplate;
    private final RedissonClient redissonClient;
    private final BiddingService biddingService; // mysql 테스트용도

    public void bidding(Long auctionId, Long itemId, Long memberId, String nickname, Long price) {
        RLock lock = redissonClient.getLock(itemId.toString());

        try {
            boolean available = lock.tryLock(10, 1, TimeUnit.SECONDS);

            if (!available) {
                log.info("lock 획득 실패");
                return;
            }

            // 사용자 입찰 시도 - 경매가 갱신 수량 테스트 (mysql)
            biddingService.increaseCount(itemId, price);

            // TODO 사용자 입찰 시도 - 경매가 갱신 (redis)

            // pub-sub으로 전달
            redisTemplate.convertAndSend(
                "UpdateAuctionPrice",
                auctionId + ":" + itemId + ":" + memberId + ":" + nickname + ":" + price + ":"
                    + LocalDateTime.now()
            );

        } catch (InterruptedException e) {
            throw new RuntimeException(e);

        } finally {
            lock.unlock();
        }
    }

    public void lockTest(Long itemId, Long quantity) {
        RLock lock = redissonClient.getLock(itemId.toString());

        try {
            boolean available = lock.tryLock(10, 1, TimeUnit.SECONDS);

            if (!available) {
                log.info("lock 획득 실패");
                return;
            }

            // 사용자 입찰 시도 - 경매가 갱신 수량 테스트 (mysql)
            int currentCount = biddingService.increaseCount(itemId, quantity);

            // pub-sub으로 전달
            redisTemplate.convertAndSend(
                "LockTest",
                itemId + ":" + currentCount + ":" + LocalDateTime.now()
            );

        } catch (InterruptedException e) {
            throw new RuntimeException(e);

        } finally {
            lock.unlock();
        }
    }
}
