package com.widzard.bidking.alarm.controller;

import com.widzard.bidking.alarm.dto.request.ReadRequest;
import com.widzard.bidking.alarm.dto.response.AlarmResponse;
import com.widzard.bidking.alarm.service.AlarmService;
import com.widzard.bidking.member.entity.Member;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/alarms")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/subscribe/{memberId}", produces = "text/event-stream")
    public ResponseEntity<CompletableFuture> subscribe(
        @PathVariable("memberId") Long memberId,
        @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        // X-Accel-Buffering 헤더 추가
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Accel-Buffering", "no");
        return ResponseEntity.ok()
            .headers(headers)
            .contentType(MediaType.TEXT_EVENT_STREAM)
            .body(alarmService.subscribe(memberId, lastEventId));
    }

    @PostMapping("/{memberId}")
    public ResponseEntity<Void> readAlarm(
        @AuthenticationPrincipal Member member,
        @RequestBody @Valid ReadRequest readRequest
    ) {
        alarmService.changeState(readRequest);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/records")
    public ResponseEntity<List<AlarmResponse>> readAlarmRecords(
        @AuthenticationPrincipal Member member
    ) {
        return new ResponseEntity<>(alarmService.readAlarmRecords(member), HttpStatus.OK);
    }
}
