package com.widzard.bidking.alarm.dto.response;

import com.widzard.bidking.alarm.entity.AlarmType;
import com.widzard.bidking.alarm.entity.Content;
import com.widzard.bidking.member.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlarmDto {

    private Member member;

    private Content content;

    private AlarmType alarmType;

    public static AlarmDto create(Member member, Content content, AlarmType alarmType) {
        return AlarmDto.builder()
            .member(member)
            .content(content)
            .alarmType(alarmType)
            .build();
    }
}
