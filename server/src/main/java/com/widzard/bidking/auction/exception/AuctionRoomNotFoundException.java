package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class AuctionRoomNotFoundException extends CustomBaseException {


    public AuctionRoomNotFoundException(String message,
        ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public AuctionRoomNotFoundException() {
        super(ErrorCode.AUCTION_ROOM_NOT_FOUND);
    }
}
