package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class UnauthorizedAuctionRoomAccessException extends CustomBaseException {

    public UnauthorizedAuctionRoomAccessException() {
        super(ErrorCode.UNAUTHORIZED_AUCTIONROOM_ACCESS);
    }

    public UnauthorizedAuctionRoomAccessException(ErrorCode errorCode) {
        super(errorCode);
    }
}
