package com.widzard.bidking.alarm.service;

import com.widzard.bidking.alarm.dto.request.ReadRequest;
import com.widzard.bidking.alarm.dto.response.AlarmResponse;
import com.widzard.bidking.auction.dto.AfterAuctionDto;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.member.entity.Member;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface AlarmService {

    CompletableFuture subscribe(Long memberId, String lastEventId);

    void sendAuctionCreateToSeller(Member member);

    void sendAuctionUpdateToBookmarkMember(Long auctionId);

    void sendAuctionDeleteToBookmarkMember(Long auctionId);

    void changeState(ReadRequest readRequest);

    void sendAuctionCloseToSellerAndOrderer(AfterAuctionDto afterAuctionDto);

    List<AlarmResponse> readAlarmRecords(Member member);
}
