package com.widzard.bidking.auction.controller;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.exception.InvalidAuctionRoomRequestException;
import com.widzard.bidking.auction.service.AuctionService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auctions/")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

    @PostMapping("/")
    public ResponseEntity<?> createAuction(
        @RequestBody @Valid AuctionCreateRequest auctionCreateRequest,
        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InvalidAuctionRoomRequestException();
        }
        Long result = auctionService.createAuctionRoom(auctionCreateRequest).getId();
        return new ResponseEntity<Long>(result, HttpStatus.OK);
    }
}
