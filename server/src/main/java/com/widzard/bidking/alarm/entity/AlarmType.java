package com.widzard.bidking.alarm.entity;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum AlarmType {
    AUCTION,
    ORDER,
    DELIVERY;
}
