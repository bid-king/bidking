package com.widzard.bidking.member.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class LoginFailureException extends CustomBaseException {

    public LoginFailureException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public LoginFailureException() {
        super(ErrorCode.LOGIN_FAILURE);
    }
}
