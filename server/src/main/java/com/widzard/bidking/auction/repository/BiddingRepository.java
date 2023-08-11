package com.widzard.bidking.auction.repository;

import com.widzard.bidking.auction.entity.Bidding;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BiddingRepository extends JpaRepository<Bidding, Long> {

    Optional<Bidding> findByItemId(Long itemId);
}

