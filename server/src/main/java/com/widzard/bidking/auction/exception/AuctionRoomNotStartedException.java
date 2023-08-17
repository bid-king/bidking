package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class AuctionRoomNotStartedException extends CustomBaseException {


    public AuctionRoomNotStartedException(String message,
        ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public AuctionRoomNotStartedException() {
        super(ErrorCode.AUCTION_ROOM_NOT_STARTED);
    }
}
