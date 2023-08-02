package com.widzard.bidking.auction.controller;

import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.AuctionListRequest;
import com.widzard.bidking.auction.dto.request.AuctionUpdateRequest;
import com.widzard.bidking.auction.dto.response.AuctionBookmarkCountResponse;
import com.widzard.bidking.auction.dto.response.AuctionBookmarkResponse;
import com.widzard.bidking.auction.dto.response.AuctionCreateResponse;
import com.widzard.bidking.auction.dto.response.AuctionResponse;
import com.widzard.bidking.auction.dto.response.AuctionRoomResponse;
import com.widzard.bidking.auction.dto.response.AuctionRoomSellerResponse;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.service.AuctionService;
import com.widzard.bidking.member.entity.Member;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping
    public ResponseEntity<List<AuctionResponse>> readAuctionList(
        @RequestBody @Valid AuctionListRequest auctionListRequest
    ) {
        List<AuctionResponse> auctionResponseList = getAuctionResponseList(
            auctionService.readAuctionRoomList(auctionListRequest));
        return new ResponseEntity<>(auctionResponseList, HttpStatus.OK);
    }

    @GetMapping("/status")
    public ResponseEntity<List<AuctionBookmarkResponse>> readAuctionListWithLoginStatus(
        @AuthenticationPrincipal Member member,
        @RequestBody @Valid AuctionListRequest auctionListRequest
    ) {
        List<AuctionBookmarkResponse> auctionBookmarkResponseList = auctionService.readAuctionRoomListWithLoginStatus(
            auctionListRequest, member);

        return new ResponseEntity<>(auctionBookmarkResponseList, HttpStatus.OK);
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<List<AuctionBookmarkResponse>> readAuctionListOnlyBookmarked(
        @AuthenticationPrincipal Member member,
        @RequestBody @Valid AuctionListRequest auctionListRequest
    ) {
        List<AuctionRoom> auctionRoomList = auctionService.readAuctionRoomListOnlyBookmarked(
            auctionListRequest, member);
        List<AuctionBookmarkResponse> auctionResponseList = new ArrayList<>();
        for (AuctionRoom auctionRoom : auctionRoomList
        ) {
            auctionResponseList.add(AuctionBookmarkResponse.from(auctionRoom, true));
        }
        return new ResponseEntity<>(auctionResponseList, HttpStatus.OK);
    }

    @GetMapping("/bookmarks/count")
    public ResponseEntity<AuctionBookmarkCountResponse> readBookmarkTotalCount(
        @AuthenticationPrincipal Member member
    ) {
        return new ResponseEntity<AuctionBookmarkCountResponse>(
            AuctionBookmarkCountResponse.from(auctionService.getTotalBookmarkCount(member)),
            HttpStatus.OK);
    }

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

    @GetMapping("/seller/after-live")
    public ResponseEntity<List<AuctionResponse>> readAuctionAfterLive(
        @AuthenticationPrincipal Member member) {
        List<AuctionResponse> auctionResponseList = getAuctionResponseList(
            auctionService.readAuctionOffLive(member));
        return new ResponseEntity<List<AuctionResponse>>(auctionResponseList, HttpStatus.OK);
    }

    @GetMapping("/seller/before-live")
    public ResponseEntity<List<AuctionResponse>> readAuctionBeforeLive(
        @AuthenticationPrincipal Member member) {
        List<AuctionResponse> auctionResponseList = getAuctionResponseList(
            auctionService.readAuctionBeforeLive(member));
        return new ResponseEntity<List<AuctionResponse>>(auctionResponseList, HttpStatus.OK);
    }

    @GetMapping("/{auctionId}/seller/after-live")
    public ResponseEntity<AuctionRoomSellerResponse> readAuctionRoomSeller(
        @AuthenticationPrincipal Member member,
        @PathVariable("auctionId") Long auctionId
    ) {
        AuctionRoomSellerResponse auctionRoomSellerResponse = auctionService.readAuctionRoomSeller(
            member, auctionId);
        return new ResponseEntity<>(auctionRoomSellerResponse, HttpStatus.OK);
    }

    private List<AuctionResponse> getAuctionResponseList(List<AuctionRoom> auctionRoomList) {
        List<AuctionResponse> auctionResponseList = new ArrayList<>();
        for (AuctionRoom auctionRoom : auctionRoomList
        ) {
            auctionResponseList.add(AuctionResponse.from(auctionRoom));
        }
        return auctionResponseList;
    }
}
