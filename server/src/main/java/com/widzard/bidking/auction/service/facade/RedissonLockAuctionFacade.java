package com.widzard.bidking.auction.service.facade;

import com.widzard.bidking.auction.exception.InvalidBidPriceException;
import com.widzard.bidking.auction.service.BiddingService;
import java.time.Duration;
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

    private static Long getLongValue(Long price, Object value) {
        if (value != null) {
            if (value instanceof Long) {
                price = (Long) value;
            } else if (value instanceof Integer) {
                price = ((Integer) value).longValue();
            }
        }
        return price;
    }

    public void bidding(Long auctionId, Long itemId, Long memberId, String nickname, Long price) {
        RLock lock = redissonClient.getLock(itemId.toString());

        try {
            boolean available = lock.tryLock(10, 1, TimeUnit.SECONDS);

            if (!available) {
                log.info("lock 획득 실패");
                return;
            }

            // 경매가 갱신 (redis)
            // 1) 경매가 갱신 검증
            Long startPrice = null;
            Long currentPrice = null;

            Object value = redisTemplate.opsForValue()
                .get(generateStartPriceKey(auctionId));

            Object value2 = redisTemplate.opsForValue()
                .get(generateBiddingPriceKey(itemId));

            startPrice = getLongValue(startPrice, value);
            currentPrice = getLongValue(currentPrice, value2);

            Long biddingCount = increaseBiddingCount(generateBiddingCountKey(itemId), 0, 1);
            log.info("***********biddingCount: {}", biddingCount);
            log.info("***********startPrice: {}", startPrice);
            log.info("***********currentPrice: {}", currentPrice);
            log.info("***********inputPrice: {}", price);

            if ((biddingCount == 1) && (startPrice > price)) {
                throw new InvalidBidPriceException();
            }
            if (biddingCount > 1 && currentPrice >= price) {
                throw new InvalidBidPriceException();
            }

            // 2) 레디스 Bidding 저장 - 자료구조 변경 리팩토링 필요
            LocalDateTime time = LocalDateTime.now();
            saveBidding(itemId, memberId, nickname, price, time);

            // 3) pub-sub으로 전달
            redisTemplate.convertAndSend(
                "UpdateAuctionPrice",
                auctionId + ":" + itemId + ":" + memberId + ":" + nickname + ":" + price + ":"
                    + time
            );

        } catch (InterruptedException e) {
            throw new RuntimeException(e);

        } finally {
            lock.unlock();
        }
    }

    private Long increaseBiddingCount(String key, int initialValue, int incrementValue) {
        if (!redisTemplate.hasKey(key)) {
            redisTemplate.opsForValue().set(key, initialValue);
        }
        return redisTemplate.opsForValue().increment(key, incrementValue);
    }

    private void saveBidding(Long itemId, Long memberId, String nickname, Long price,
        LocalDateTime time) {
        redisTemplate.opsForValue()
            .set(generateBiddingUserIdKey(itemId), memberId, Duration.ofDays(1));
        redisTemplate.opsForValue()
            .set(generateBiddingNicknameKey(itemId), nickname, Duration.ofDays(1));
        redisTemplate.opsForValue()
            .set(generateBiddingPriceKey(itemId), price, Duration.ofDays(1));
        redisTemplate.opsForValue()
            .set(generateBiddingTimeKey(itemId), time, Duration.ofDays(1));
    }

    private String generateStartPriceKey(Long auctionId) {
        return "auction" + ":" + auctionId + ":" + "onLiveItem:startPrice";
    }

    private String generateBiddingCountKey(Long itemId) {
        return "item:" + itemId + ":bidding:count";
    }

    private String generateBiddingTimeKey(Long itemId) {
        return "item:" + itemId + ":bidding:time";
    }

    private String generateBiddingPriceKey(Long itemId) {
        return "item:" + itemId + ":bidding:price";
    }

    private String generateBiddingNicknameKey(Long itemId) {
        return "item:" + itemId + ":bidding:nickname";
    }

    private String generateBiddingUserIdKey(Long itemId) {
        return "item:" + itemId + ":bidding:userId";
    }

    public void lockTest(Long itemId, Long quantity) {
        RLock lock = redissonClient.getLock(itemId.toString());

        try {
            boolean available = lock.tryLock(10, 1, TimeUnit.SECONDS);

            if (!available) {
                log.info("lock 획득 실패");
                return;
            }

            // 사용자 입찰 시도 - 동시성 수량 테스트 (mysql)
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
