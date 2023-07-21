package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class InvalidAuctionRoomRequestException extends CustomBaseException {

    public InvalidAuctionRoomRequestException(ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public InvalidAuctionRoomRequestException() {
        super(ErrorCode.INVALID_AUCTION_REQUEST_ERROR);
    }
}
