package com.widzard.bidking.alarm.controller;

import com.widzard.bidking.alarm.service.AlarmService;
import com.widzard.bidking.member.entity.Member;
import java.time.LocalDateTime;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RestController
@RequestMapping("/api/v1/alarms")
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;
    private final RedisTemplate<String, String> redisTemplate;

    @PreAuthorize("hasAuthority('alarm.read')")
    @GetMapping(value = "/alarm/subscribe", produces = "text/event-stream")
    public SseEmitter alarmSubscribe( @AuthenticationPrincipal Member member,
        @RequestHeader(value = "Last-Event-ID", required = false) String lastEventId,
        HttpServletResponse response) {
        //nginx리버스 프록시에서 버퍼링 기능으로 인한 오동작 방지
        response.setHeader("X-Accel-Buffering", "no");
//        return alarmService.subscribe(member, lastEventId, LocalDateTime.now());
        return new SseEmitter();
    }
}
