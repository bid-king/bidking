package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class AuctionRoomImageNotFound extends CustomBaseException {

    public AuctionRoomImageNotFound() {
        super(ErrorCode.ALREADY_STARTED_AUCTIONROOM);
    }

    public AuctionRoomImageNotFound(ErrorCode errorCode) {
        super(errorCode);
    }
}
