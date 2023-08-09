package com.widzard.bidking.alarm.controller;

import com.widzard.bidking.alarm.service.AlarmService;
import com.widzard.bidking.member.entity.Member;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/alarms")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/subscribe/{memberId}", produces = "text/event-stream")
    public CompletableFuture subscribe(
        @PathVariable("memberId") Long memberId,
        @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {

        log.info("연결 요청 옴, Last-Event-id={}, memberId={}", lastEventId, memberId);
        return alarmService.subscribe(memberId, lastEventId);
    }

    @PostMapping("/{memberId}")
    public ResponseEntity<Void> readAlarm(
        @PathVariable("memberId") Long memberId,
        @RequestBody Long alarmId
    ) {
        alarmService.changeState(alarmId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
