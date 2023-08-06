package com.widzard.bidking.alarm.service;

import com.widzard.bidking.member.entity.Member;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface AlarmService {

    SseEmitter subscribe(Member member, String lastEventId);
}
