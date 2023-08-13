package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class UnableToDeleteAuctionNow extends CustomBaseException {

    public UnableToDeleteAuctionNow() {
        super(ErrorCode.UNABLE_TO_DELETE_AUCTION_NOW);
    }

    public UnableToDeleteAuctionNow(ErrorCode errorCode) {
        super(errorCode);
    }
}
