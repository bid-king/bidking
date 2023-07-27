package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class AuctionStartTimeInvalidException extends CustomBaseException {

    public AuctionStartTimeInvalidException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public AuctionStartTimeInvalidException() {
        super(ErrorCode.AUCTION_START_TIME_ERROR);
    }
}
