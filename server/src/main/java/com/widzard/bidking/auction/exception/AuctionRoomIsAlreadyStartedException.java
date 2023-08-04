package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class AuctionRoomIsAlreadyStartedException extends CustomBaseException {

    public AuctionRoomIsAlreadyStartedException() {
        super(ErrorCode.ALREADY_STARTED_AUCTIONROOM);
    }
    public AuctionRoomIsAlreadyStartedException(ErrorCode errorCode) {
        super(errorCode);
    }
}
