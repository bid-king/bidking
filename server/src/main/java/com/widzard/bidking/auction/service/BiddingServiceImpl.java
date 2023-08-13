package com.widzard.bidking.auction.service;

import com.widzard.bidking.auction.entity.Bidding;
import com.widzard.bidking.auction.repository.BiddingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BiddingServiceImpl implements BiddingService {

    private final BiddingRepository biddingRepository;

    @Override
    public void bidding(Long itemId, Long price) {
        // 아이템 경매가 조회
        Bidding bidding = biddingRepository.findByItemId(itemId).orElseThrow();

        // 경매가 up
        bidding.raisePrice(price);

        // 갱신된 값 저장
        biddingRepository.saveAndFlush(bidding);
    }

    @Override
    public int increaseCount(Long itemId, Long quantity) {
        // 아이템 경매가 조회
        Bidding bidding = biddingRepository.findByItemId(itemId).orElseThrow();

        // 경매가 up
        bidding.increaseCount(quantity);

        // 갱신된 값 저장
        biddingRepository.saveAndFlush(bidding);

        return bidding.getCount();
    }

}
