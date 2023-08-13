package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class UnableToUpdateAuctionNow extends CustomBaseException {

    public UnableToUpdateAuctionNow() {
        super(ErrorCode.UNABLE_TO_UPDATE_AUCTION_NOW);
    }

    public UnableToUpdateAuctionNow(ErrorCode errorCode) {
        super(errorCode);
    }
}
