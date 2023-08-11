package com.widzard.bidking.auction.service.facade;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedissonLockAuctionFacade {

    private final RedissonClient redissonClient;
//    private final ItemService itemService;

    public void bidding(Long itemId, Long price) {
        RLock lock = redissonClient.getLock(itemId.toString());

        try {
            boolean available = lock.tryLock(10, 1, TimeUnit.SECONDS);

            if (!available) {
                log.info("lock 획득 실패");
                return;
            }

//            itemService.testBid(itemId, price);

        } catch (InterruptedException e) {
            throw new RuntimeException(e);

        } finally {
            lock.unlock();
        }
    }
}
