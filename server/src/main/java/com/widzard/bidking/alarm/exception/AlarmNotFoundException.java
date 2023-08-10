package com.widzard.bidking.alarm.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class AlarmNotFoundException extends CustomBaseException {

    public AlarmNotFoundException() {
        super(ErrorCode.ALARM_NOT_FOUND_EXCEPTION);
    }

    public AlarmNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
