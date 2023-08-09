package com.widzard.bidking.alarm.service;

import com.widzard.bidking.alarm.dto.response.AlarmResponse;
import com.widzard.bidking.alarm.entity.Alarm;
import com.widzard.bidking.alarm.entity.AlarmType;
import com.widzard.bidking.alarm.entity.Content;
import com.widzard.bidking.alarm.exception.AlarmNotFoundException;
import com.widzard.bidking.alarm.exception.ClientConnectionException;
import com.widzard.bidking.alarm.repository.AlarmRepository;
import com.widzard.bidking.alarm.repository.EmitterRepository;
import com.widzard.bidking.member.entity.Member;
import java.io.IOException;
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
    private final EmitterRepository emitterRepository;

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    @Override
    @Async
    public CompletableFuture subscribe(Long memberId, String lastEventId) {
        // 고유 식별자 부여
        String id = memberId + "_" + System.currentTimeMillis();

        SseEmitter emitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

        //예외 상황에 emitter 삭제
        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        emitter.onTimeout(() -> emitterRepository.deleteById(id));

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        sendToClient(emitter, id, "EventStream Created. [userId=" + memberId + "]");

        // 클라이언트가 미수신한 Event 목록이 존재할 경우 전송하여 Event 유실을 예방
        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithId(
                String.valueOf(memberId));
            events.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
        }
        log.info("연결 요청 끝");
        return CompletableFuture.completedFuture(emitter);
    }

    @Override
    public void send(Member member, Content content, AlarmType alarmType) {
        Alarm alarm = Alarm.create(member, content, alarmType);
        alarmRepository.save(alarm);
        String id = String.valueOf(member.getId());
        // 로그인 한 유저의 SseEmitter 모두 가져오기
        Map<String, SseEmitter> sseEmitterMap = emitterRepository.findAllStartWithById(id);
        sseEmitterMap.forEach(
            (key, emitter) -> {
                // 데이터 캐시 저장(유실된 데이터 처리하기 위함)
                emitterRepository.saveEventCache(key, alarm);
                sendToClient(emitter, key, AlarmResponse.from(alarm));
            }
        );
    }

    @Override
    public void changeState(Long alarmId) {
        Alarm alarm = alarmRepository.findById(alarmId).orElseThrow(
            AlarmNotFoundException::new);
        alarm.read();
        alarmRepository.save(alarm);
    }

    private void sendToClient(SseEmitter emitter, String id, Object data) {
        try {
            emitter.send(SseEmitter.event()
                .id(id)
                .name("sseEvent")
                .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteById(id);
            throw new ClientConnectionException();
        }
    }
}
