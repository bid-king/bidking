package com.widzard.bidking.global.exception;

public class UnAuthorizationException extends CustomBaseException {

    public UnAuthorizationException() {
        super(ErrorCode.FORBIDDEN);
    }

    public UnAuthorizationException(ErrorCode errorCode) {
        super(errorCode);
    }
}
