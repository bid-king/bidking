package com.widzard.bidking.auction.controller;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.exception.InvalidAuctionRoomRequestException;
import com.widzard.bidking.auction.service.AuctionService;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/v1/auctions/")
public class AuctionController {

    private final AuctionService auctionService;

    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    // TODO token으로 user 정보 받아야 함. (login check: 본인인증 된 유저)
    @PostMapping("/")
    public ResponseEntity<?> createAuction(

        @RequestBody @Valid AuctionCreateRequest auctionCreateRequest,
        BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new InvalidAuctionRoomRequestException();
        }

        AuctionRoom result = auctionService.createAuctionRoom(auctionCreateRequest);
        return new ResponseEntity<Long>(result.getId(), HttpStatus.OK);
    }
}
