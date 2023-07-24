package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class SendingMessageFailureException extends CustomBaseException {

    public SendingMessageFailureException() {
        super(ErrorCode.SENDING_MESSAGE_FAILURE);
    }

    public SendingMessageFailureException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }
}
