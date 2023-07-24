package com.widzard.bidking.global.jwt.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class InvalidTokenException extends CustomBaseException {

    public InvalidTokenException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }
    public InvalidTokenException() {
        super(ErrorCode.INVALID_TOKEN);
    }
}
