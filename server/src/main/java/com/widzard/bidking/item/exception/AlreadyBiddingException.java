package com.widzard.bidking.item.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class AlreadyBiddingException extends CustomBaseException {

    public AlreadyBiddingException() {
        super(ErrorCode.ITEM_ALREADY_START_BIDDING);
    }

    public AlreadyBiddingException(ErrorCode errorCode) {
        super(errorCode);
    }
}
