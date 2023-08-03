package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class UnableToStartAuctionException extends CustomBaseException {

    public UnableToStartAuctionException() {
        super(ErrorCode.UNABLE_START_AUCTIONROOM);
    }

    public UnableToStartAuctionException(ErrorCode errorCode) {
        super(errorCode);
    }
}
