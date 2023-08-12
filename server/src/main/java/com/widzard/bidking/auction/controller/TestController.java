package com.widzard.bidking.auction.controller;

import com.widzard.bidking.auction.service.facade.StartBiddingFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/redisTest")
public class TestController {

    private final StartBiddingFacade testService;

//    @PostMapping("/{itemId}/test")
//    public String testPubsub(@PathVariable("itemId") Long itemId) {
//        testService.startBidding(itemId, 10000L);
//        return "ok";
//    }

}
