package com.widzard.bidking.member.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class MemberDuplicatedException extends CustomBaseException {

    public MemberDuplicatedException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public MemberDuplicatedException() {
        super(ErrorCode.MEMBER_DUPLICATED);
    }
}
