package com.widzard.bidking.alarm.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class ClientConnectionException extends CustomBaseException {

    public ClientConnectionException() {
        super(ErrorCode.CLIENT_CONNECTION_EXCEPTION);
    }

    public ClientConnectionException(ErrorCode errorCode) {
        super(errorCode);
    }
}

