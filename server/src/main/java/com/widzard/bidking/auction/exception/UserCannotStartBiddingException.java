package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class UserCannotStartBiddingException extends CustomBaseException {

    public UserCannotStartBiddingException() {
        super(ErrorCode.CANNOT_ALLOWED_TO_START_AUCTION);
    }

    public UserCannotStartBiddingException(ErrorCode errorCode) {
        super(errorCode);
    }
}
