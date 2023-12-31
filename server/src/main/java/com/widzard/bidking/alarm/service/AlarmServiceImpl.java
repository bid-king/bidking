package com.widzard.bidking.alarm.service;

import com.widzard.bidking.alarm.dto.request.ReadRequest;
import com.widzard.bidking.alarm.dto.response.AlarmResponse;
import com.widzard.bidking.alarm.entity.Alarm;
import com.widzard.bidking.alarm.entity.AlarmType;
import com.widzard.bidking.alarm.entity.Content;
import com.widzard.bidking.alarm.exception.AlarmNotFoundException;
import com.widzard.bidking.alarm.exception.ClientConnectionException;
import com.widzard.bidking.alarm.repository.AlarmRepository;
import com.widzard.bidking.alarm.repository.EmitterRepository;
import com.widzard.bidking.auction.dto.AfterAuctionDto;
import com.widzard.bidking.auction.dto.OrdererDto;
import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.exception.AuctionRoomNotFoundException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.bookmark.entity.Bookmark;
import com.widzard.bidking.bookmark.repository.BookmarkRepository;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberNotFoundException;
import com.widzard.bidking.member.repository.MemberRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

    private final AlarmRepository alarmRepository;
    private final AuctionRoomRepository auctionRoomRepository;
    private final MemberRepository memberRepository;
    private final BookmarkRepository bookmarkRepository;
    private final EmitterRepository emitterRepository;

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    @Override
    @Async
    public CompletableFuture subscribe(Long memberId, String lastEventId) {
        // 고유 식별자 부여
        String id = String.valueOf(memberId);
        SseEmitter emitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

        //예외 상황에 emitter 삭제
        emitter.onCompletion(() -> emitterRepository.deleteAllStartWithId(id));
        emitter.onTimeout(() -> emitterRepository.deleteAllStartWithId(id));
        emitter.onError((e) -> emitterRepository.deleteAllStartWithId(id));

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        sendToClient(emitter, id, "EventStream Created. [userId=" + memberId + "]");
        return CompletableFuture.completedFuture(emitter);
    }

    @Override
    public void sendAuctionCreateToSeller(Member member) {
        send(member, Content.AUCTION_REGISTERED.getContent(), AlarmType.AUCTION);
    }

    @Override
    public void sendAuctionUpdateToBookmarkMember(Long auctionId) {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionId).orElseThrow(
            AuctionRoomNotFoundException::new);
        List<Optional<Bookmark>> bookmarkList = bookmarkRepository.findBookmarkByAuctionRoom(
            auctionRoom);
        for (Optional<Bookmark> bookmark : bookmarkList
        ) {
            if (bookmark.isPresent()) {
                send(bookmark.get().getMember(), Content.AUCTION_UPDATED_BOOKMARK.getContent(),
                    AlarmType.AUCTION);
            }
        }
    }

    @Override
    public void sendAuctionDeleteToBookmarkMember(Long auctionId) {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionId).orElseThrow(
            AuctionRoomNotFoundException::new);
        List<Optional<Bookmark>> bookmarkList = bookmarkRepository.findBookmarkByAuctionRoom(
            auctionRoom);
        for (Optional<Bookmark> bookmark : bookmarkList
        ) {
            if (bookmark.isPresent()) {
                send(bookmark.get().getMember(), Content.AUCTION_DELETED_BOOKMARK.getContent(),
                    AlarmType.AUCTION);
            }
        }
    }
    @Override
    public void sendAuctionCloseToSellerAndOrderer(AfterAuctionDto afterAuctionDto) {
        Member seller = memberRepository.findById(afterAuctionDto.getSellerId()).orElseThrow(
            MemberNotFoundException::new);
        Alarm closeAuctionAlarm = Alarm.closeAuction(seller, AlarmType.AUCTION,
            afterAuctionDto.getAuctionRoomTitle(), afterAuctionDto.getOrderSuccessCnt(),
            afterAuctionDto.getOrderFailCnt());
        send(seller, closeAuctionAlarm.getContent(), AlarmType.AUCTION);
        List<OrdererDto> ordererDtoList = afterAuctionDto.getOrdererDtoList();

        for (OrdererDto ordererDto : ordererDtoList
        ) { Member orderer = memberRepository.findById(ordererDto.getOrdererId())
            .orElseThrow(MemberNotFoundException::new);
            Alarm successItemAlarm = Alarm.createSuccessItem(orderer, AlarmType.ORDER, ordererDto.getItemName());
            send(orderer, successItemAlarm.getContent(), AlarmType.ORDER);
        }
    }

    @Override
    public void changeState(ReadRequest readRequest) {
        Alarm alarm = alarmRepository.findById(readRequest.getAlarmId())
            .orElseThrow(AlarmNotFoundException::new);
        alarm.read();
        alarmRepository.save(alarm);
    }

    @Override
    public List<AlarmResponse> readAlarmRecords(Member member) {
        List<Alarm> alarmList = alarmRepository.findTop5ByMemberIdOrderByCreatedAtDesc(
            member.getId());
        List<AlarmResponse> alarmResponseList = new ArrayList<>();
        if (!alarmList.isEmpty()) {
            for (Alarm alarm : alarmList
            ) {
                alarmResponseList.add(AlarmResponse.from(alarm));
            }
        }
        return alarmResponseList;
    }

    private void send(Member member, String content, AlarmType alarmType) {
        Alarm alarm = Alarm.create(member, content, alarmType);
        alarmRepository.save(alarm);
        String sendId = String.valueOf(member.getId());
        // 로그인 한 유저의 SseEmitter 모두 가져오기
        Map<String, SseEmitter> sseEmitterMap = emitterRepository.findAllStartById(sendId);
        sseEmitterMap.forEach(
            (key, emitter) -> {
                // 데이터 캐시 저장(유실된 데이터 처리하기 위함)
                emitterRepository.saveEventCache(key, alarm);
                sendToClient(emitter, sendId, AlarmResponse.from(alarm));
            }
        );
    }

    private void sendToClient(SseEmitter emitter, String id, Object data) {
        try {
            emitter.send(SseEmitter.event()
                .id(id)
                .name("sseEvent")
                .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteAllStartWithId(id);
            log.info("알림 전송 실패");
            exception.printStackTrace();
        }
    }
}
