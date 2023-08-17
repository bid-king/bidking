package com.widzard.bidking.alarm.dto.response;

import com.widzard.bidking.alarm.entity.Alarm;
import com.widzard.bidking.alarm.entity.AlarmType;
import com.widzard.bidking.alarm.entity.Content;
import java.time.LocalDateTime;
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

    private Long id;

    private String content;

    private LocalDateTime createdTime;

    private AlarmType alarmType;

    private Boolean isRead;

    public static AlarmResponse from(Alarm alarm) {
        return AlarmResponse.builder()
            .id(alarm.getId())
            .content(alarm.getContent())
            .createdTime(alarm.getCreatedAt())
            .alarmType(alarm.getAlarmType())
            .isRead(alarm.getIsRead())
            .build();
    }
}
