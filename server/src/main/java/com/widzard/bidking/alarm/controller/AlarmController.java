package com.widzard.bidking.alarm.controller;

import com.widzard.bidking.alarm.service.AlarmService;
import com.widzard.bidking.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/alarm")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(
        @AuthenticationPrincipal Member member,
        @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId){

        return alarmService.subscribe(member, lastEventId);
    }

}
