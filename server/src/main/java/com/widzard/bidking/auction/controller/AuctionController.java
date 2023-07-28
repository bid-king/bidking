package com.widzard.bidking.auction.controller;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.AuctionUpdateRequest;
import com.widzard.bidking.auction.dto.response.AuctionCreateResponse;
import com.widzard.bidking.auction.dto.response.AuctionRoomResponse;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.service.AuctionService;
import com.widzard.bidking.member.entity.Member;
import java.io.IOException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auctions")
public class AuctionController {

    private final AuctionService auctionService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<AuctionCreateResponse> createAuction(
        @AuthenticationPrincipal Member member,
        @RequestPart @Valid AuctionCreateRequest auctionCreateRequest,
        @RequestPart(name = "auctionRoomImg") MultipartFile auctionRoomImg,
        @RequestPart(name = "itemImgs") MultipartFile[] itemImgs
    ) throws IOException {
        AuctionRoom auctionRoom = auctionService.createAuctionRoom(member, auctionCreateRequest,
            auctionRoomImg, itemImgs);
        return new ResponseEntity<>(AuctionCreateResponse.from(auctionRoom), HttpStatus.OK);
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<AuctionRoomResponse> readAuction(
        @AuthenticationPrincipal Member member,
        @PathVariable Long auctionId
    ) {
        AuctionRoom auctionRoom = auctionService.readAuctionRoom(auctionId);
        return new ResponseEntity<>(AuctionRoomResponse.from(auctionRoom), HttpStatus.OK);
    }

    @PutMapping("/{auctionId}")
    public ResponseEntity updateAuction(
        @AuthenticationPrincipal Member member,
        @RequestPart @Valid AuctionUpdateRequest auctionUpdateRequest,
        @PathVariable Long auctionId,
        @RequestPart(name = "auctionRoomImg") MultipartFile auctionRoomImg,
        @RequestPart(name = "itemImgs") MultipartFile[] itemImgs
    ) throws IOException {
        auctionService.updateAuctionRoom(auctionId, auctionUpdateRequest, auctionRoomImg, itemImgs);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


    @DeleteMapping("/{auctionId}")
    public ResponseEntity deleteAuction(
        @AuthenticationPrincipal Member member,
        @PathVariable Long auctionId
    ) {
        auctionService.deleteAuctionRoom(auctionId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
