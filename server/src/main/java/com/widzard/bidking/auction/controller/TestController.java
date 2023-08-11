package com.widzard.bidking.auction.controller;

import com.widzard.bidking.auction.service.facade.StartAuctionFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/redisTest")
public class TestController {

    private final StartAuctionFacade testService;

    @PostMapping("/{itemId}/test")
    public String testPubsub(@PathVariable("itemId") Long itemId) {
        testService.updateAuctionPrice(itemId, 10000L);
        return "ok";
    }

}
