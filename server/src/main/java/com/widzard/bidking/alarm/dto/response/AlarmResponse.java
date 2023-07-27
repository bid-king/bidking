package com.widzard.bidking.alarm.dto.response;

import com.widzard.bidking.alarm.entity.Content;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlarmResponse {

    private String content;
    private String alarmType;
    private String mediaType;

    private AlarmResponse(final Content content){
        this.content = content.getContent();
        this.alarmType = content.getAlarmType();
        this.mediaType = content.getMediaType();
    }
}
