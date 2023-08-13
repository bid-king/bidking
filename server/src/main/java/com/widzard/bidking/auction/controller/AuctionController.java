package com.widzard.bidking.auction.controller;

import com.widzard.bidking.auction.dto.AuctionRoomEnterDto;
import com.widzard.bidking.auction.dto.request.AuctionCreateRequest;
import com.widzard.bidking.auction.dto.request.AuctionListRequest;
import com.widzard.bidking.auction.dto.request.AuctionUpdateRequest;
import com.widzard.bidking.auction.dto.request.TryBiddingRequest;
import com.widzard.bidking.auction.dto.response.AuctionBookmarkCountResponse;
import com.widzard.bidking.auction.dto.response.AuctionBookmarkResponse;
import com.widzard.bidking.auction.dto.response.AuctionCreateResponse;
import com.widzard.bidking.auction.dto.response.AuctionResponse;
import com.widzard.bidking.auction.dto.response.AuctionRoomEnterItemsResponse;
import com.widzard.bidking.auction.dto.response.AuctionRoomEnterResponse;
import com.widzard.bidking.auction.dto.response.AuctionRoomResponse;
import com.widzard.bidking.auction.dto.response.AuctionRoomSellerResponse;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.service.AuctionService;
import com.widzard.bidking.auction.service.facade.RedissonLockAuctionFacade;
import com.widzard.bidking.auction.service.facade.StartBiddingFacade;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuctionController {

    private final AuctionService auctionService;
    private final StartBiddingFacade startBiddingFacade;
    private final RedissonLockAuctionFacade redissonLockAuctionFacade;

    @GetMapping("/auctions")
    public ResponseEntity<List<AuctionResponse>> readAuctionList(
        @RequestParam(value = "keyword", required = false) String keyword,
        @RequestParam(value = "page") int page,
        @RequestParam(value = "perPage") int perPage,
        @RequestParam(value = "categoryList") List<Long> categoryList
    ) {
        List<AuctionResponse> auctionResponseList = getAuctionResponseList(
            auctionService.readAuctionRoomList(
                AuctionListRequest.create(keyword, page, perPage, categoryList)));
        return new ResponseEntity<>(auctionResponseList, HttpStatus.OK);
    }

    @GetMapping("/auctions/status")
    public ResponseEntity<List<AuctionBookmarkResponse>> readAuctionListWithLoginStatus(
        @AuthenticationPrincipal Member member,
        @RequestParam(value = "keyword", required = false) String keyword,
        @RequestParam(value = "page") int page,
        @RequestParam(value = "perPage") int perPage,
        @RequestParam(value = "categoryList") List<Long> categoryList
    ) {
        List<AuctionBookmarkResponse> auctionBookmarkResponseList = auctionService.readAuctionRoomListWithLoginStatus(
            AuctionListRequest.create(keyword, page, perPage, categoryList), member);

        return new ResponseEntity<>(auctionBookmarkResponseList, HttpStatus.OK);
    }

    @GetMapping("/auctions/bookmarks")
    public ResponseEntity<List<AuctionBookmarkResponse>> readAuctionListOnlyBookmarked(
        @AuthenticationPrincipal Member member,
        @RequestParam(value = "keyword", required = false) String keyword,
        @RequestParam(value = "page") int page,
        @RequestParam(value = "perPage") int perPage,
        @RequestParam(value = "categoryList") List<Long> categoryList
    ) {
        List<AuctionRoom> auctionRoomList = auctionService.readAuctionRoomListOnlyBookmarked(
            AuctionListRequest.create(keyword, page, perPage, categoryList), member);
        List<AuctionBookmarkResponse> auctionResponseList = new ArrayList<>();
        for (AuctionRoom auctionRoom : auctionRoomList
        ) {
            auctionResponseList.add(AuctionBookmarkResponse.from(auctionRoom, true));
        }
        return new ResponseEntity<>(auctionResponseList, HttpStatus.OK);
    }

    @GetMapping("/auctions/bookmarks/count")
    public ResponseEntity<AuctionBookmarkCountResponse> readBookmarkTotalCount(
        @AuthenticationPrincipal Member member
    ) {
        return new ResponseEntity<>(
            AuctionBookmarkCountResponse.from(auctionService.getTotalBookmarkCount(member)),
            HttpStatus.OK);
    }

    @PostMapping(path = "/auctions", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
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

    @GetMapping("/auctions/{auctionId}")
    public ResponseEntity<AuctionRoomResponse> readAuction(
        @AuthenticationPrincipal Member member,
        @PathVariable Long auctionId
    ) {
        AuctionRoom auctionRoom = auctionService.readAuctionRoom(auctionId);
        return new ResponseEntity<>(AuctionRoomResponse.from(auctionRoom), HttpStatus.OK);
    }

    @PutMapping("/auctions/{auctionId}")
    public ResponseEntity updateAuction(
        @AuthenticationPrincipal Member member,
        @RequestPart @Valid AuctionUpdateRequest auctionUpdateRequest,
        @PathVariable Long auctionId,
        @RequestPart(name = "auctionRoomImg", required = false) MultipartFile auctionRoomImg,
        @RequestPart(name = "itemImgs", required = false) MultipartFile[] itemImgs
    ) throws IOException {
        auctionService.updateAuctionRoom(member, auctionId, auctionUpdateRequest, auctionRoomImg,
            itemImgs);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/auctions/{auctionId}")
    public ResponseEntity deleteAuction(
        @AuthenticationPrincipal Member member,
        @PathVariable Long auctionId
    ) {
        auctionService.deleteAuctionRoom(member, auctionId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/auctions/seller/after-live")
    public ResponseEntity<List<AuctionResponse>> readAuctionAfterLive(
        @AuthenticationPrincipal Member member) {
        List<AuctionResponse> auctionResponseList = getAuctionResponseList(
            auctionService.readAuctionOffLive(member));
        return new ResponseEntity<>(auctionResponseList, HttpStatus.OK);
    }

    @GetMapping("/auctions/seller/before-live")
    public ResponseEntity<List<AuctionResponse>> readAuctionBeforeLive(
        @AuthenticationPrincipal Member member) {
        List<AuctionResponse> auctionResponseList = getAuctionResponseList(
            auctionService.readAuctionBeforeLive(member));
        return new ResponseEntity<>(auctionResponseList, HttpStatus.OK);
    }

    @GetMapping("/auctions/{auctionId}/seller/after-live")
    public ResponseEntity<AuctionRoomSellerResponse> readAuctionRoomSeller(
        @AuthenticationPrincipal Member member,
        @PathVariable("auctionId") Long auctionId
    ) {
        AuctionRoomSellerResponse auctionRoomSellerResponse = auctionService.readAuctionRoomSeller(
            member, auctionId);
        return new ResponseEntity<>(auctionRoomSellerResponse, HttpStatus.OK);
    }

    /*
     * 경매방 입장 (유저 인증 및 셀러 여부 반환)
     */
    @GetMapping("/bid/{auctionId}/enter")
    public ResponseEntity<AuctionRoomEnterResponse> validateEnteringRoom(
        @AuthenticationPrincipal Member member,
        @PathVariable("auctionId") Long auctionId
    ) {
        AuctionRoomEnterDto dto = auctionService.validateEnterRoom(
            member,
            auctionId
        );
        return new ResponseEntity<>(
            AuctionRoomEnterResponse.from(dto),
            HttpStatus.OK
        );
    }

    /*
     * 인증된 유저에게 필요한 경매방, 아이템 리스트 반환
     */
    @GetMapping("/bid/{auctionId}/items")
    public ResponseEntity<AuctionRoomEnterItemsResponse> getLiveAuctionItemList(
        @PathVariable("auctionId") Long auctionId
    ) {
        AuctionRoom auctionRoom = auctionService.getLiveAuctionItemList(auctionId);
        return new ResponseEntity<>(
            AuctionRoomEnterItemsResponse.from(auctionRoom),
            HttpStatus.OK
        );
    }


    /*
     * 상품 경매 시작
     */
    @PostMapping("/bid/{auctionId}/items/{itemId}/start")
    public ResponseEntity<String> startBidding(
        @AuthenticationPrincipal Member member,
        @PathVariable("auctionId") Long auctionId,
        @PathVariable("itemId") Long itemId
    ) {
        startBiddingFacade.startBidding(member, auctionId, itemId);
        return new ResponseEntity<>(
            "ok",
            HttpStatus.OK
        );
    }

    /*
     * 경매 입찰 시도
     */
    @PostMapping("/bid/{auctionId}/items/{itemId}/try")
    public ResponseEntity<String> tryBidding(
        @AuthenticationPrincipal Member member,
        @PathVariable("itemId") Long itemId,
        @PathVariable("auctionId") Long auctionId,
        @RequestBody @Valid TryBiddingRequest request
    ) {
        redissonLockAuctionFacade.bidding(
            auctionId,
            itemId,
            member.getId(),
            member.getNickname(),
            request.getPrice()
        );
        return new ResponseEntity<>(
            "ok",
            HttpStatus.OK
        );
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
