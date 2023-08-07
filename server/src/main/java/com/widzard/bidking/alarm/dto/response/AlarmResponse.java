package com.widzard.bidking.alarm.dto.response;

import com.widzard.bidking.alarm.entity.Alarm;
import com.widzard.bidking.alarm.entity.AlarmType;
import com.widzard.bidking.alarm.entity.Content;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlarmResponse {

    private String content;

    private AlarmType alarmType;

    public static AlarmResponse from(Alarm alarm){
        return AlarmResponse.builder()
            .content(alarm.getContent().name())
            .alarmType(alarm.getAlarmType())
            .build();
    }
}
