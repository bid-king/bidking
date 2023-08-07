package com.widzard.bidking.alarm.service;

import com.widzard.bidking.alarm.entity.AlarmType;
import com.widzard.bidking.alarm.entity.Content;
import com.widzard.bidking.member.entity.Member;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface AlarmService {

    SseEmitter subscribe(Long memberId, String lastEventId);

    void send(Member member, Content content, AlarmType alarmType);
}
