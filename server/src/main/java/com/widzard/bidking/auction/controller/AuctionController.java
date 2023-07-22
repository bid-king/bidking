package com.widzard.bidking.auction.controller;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.exception.InvalidAuctionRoomRequestException;
import com.widzard.bidking.auction.service.AuctionService;
import com.widzard.bidking.global.entity.Address;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.entity.MemberRole;
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
@RequestMapping("/api/v1/auctions")
public class AuctionController {

    private final AuctionService auctionService;

    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    // TODO token으로 user 정보 받아야 함. (login check: 본인인증 된 유저)
    @PostMapping
    public ResponseEntity<Long> createAuction(
        @RequestBody @Valid AuctionCreateRequest auctionCreateRequest,
        BindingResult bindingResult) {

        // TODO 테스트용 멤버 (나중에 구현해야함)
        Address tempAddress = new Address("asd", "asd", "asd");
        Member tempMember = Member.builder()
            .id(1L)
            .email("asd")
            .address(tempAddress)
            .memberRole(MemberRole.USER)
            .nickname("asd")
            .phoneNumber("asd")
            .available(true)
            .build();

        if (bindingResult.hasErrors()) {
            throw new InvalidAuctionRoomRequestException();
        }

        AuctionRoom result = auctionService.createAuctionRoom(tempMember, auctionCreateRequest);
        return new ResponseEntity<Long>(result.getId(), HttpStatus.OK);
    }
}
