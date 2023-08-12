package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class InvalidBidPriceException extends CustomBaseException {

    public InvalidBidPriceException() {
        super(ErrorCode.INVALID_BID_PRICE);
    }

    public InvalidBidPriceException(ErrorCode errorCode) {
        super(errorCode);
    }
}
