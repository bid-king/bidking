package com.widzard.bidking.member.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class PhoneNumberDuplicatedException extends CustomBaseException {

    public PhoneNumberDuplicatedException() {
        super(ErrorCode.PHONE_DUPLICATED);
    }

    public PhoneNumberDuplicatedException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }
}
