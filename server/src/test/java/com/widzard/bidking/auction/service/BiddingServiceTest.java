package com.widzard.bidking.auction.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.widzard.bidking.auction.entity.Bidding;
import com.widzard.bidking.auction.repository.BiddingRepository;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BiddingServiceTest {

    @Autowired
    private BiddingService biddingService;

    @Autowired
    private BiddingRepository biddingRepository;

    @BeforeEach
    public void insert() {
        Bidding bidding = new Bidding(1L, 1L, 1L, 500L, 0);

        biddingRepository.saveAndFlush(bidding);
    }

    @AfterEach
    public void delete() {
        biddingRepository.deleteAll();
    }

    @Test
    public void decrease_test() {
        biddingService.bidding(1L, 1000L);

        Bidding bidding = biddingRepository.findById(1L).orElseThrow();

        assertEquals(1000L, bidding.getPrice());
    }

    @Test
    public void 동시에_100명이_주문() throws InterruptedException {
        int threadCount = 100;
        ExecutorService executorService = Executors.newFixedThreadPool(32);
        CountDownLatch latch = new CountDownLatch(threadCount);

        for (int i = 0; i < threadCount; i++) {
            executorService.submit(() -> {
                try {
                    biddingService.bidding(1L, 100000L);
                    // TODO 수량 up
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();

        Bidding bidding = biddingRepository.findById(1L).orElseThrow();

        // 100 - (100 * 1) = 0
        assertEquals(100, bidding.getCount());
    }
}