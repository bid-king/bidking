package com.widzard.bidking.member.exception;

import com.widzard.bidking.common.exception.CustomBaseException;
import com.widzard.bidking.common.exception.ErrorCode;

public class MemberNotFoundException extends CustomBaseException {
    public MemberNotFoundException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public MemberNotFoundException() {
        super(ErrorCode.MEMBER_NOT_FOUND);
    }
}
