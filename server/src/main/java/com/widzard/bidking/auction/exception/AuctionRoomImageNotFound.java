package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class AuctionRoomImageNotFound extends CustomBaseException {

    public AuctionRoomImageNotFound() {
        super(ErrorCode.AUCTION_ROOM_IMAGE_NOT_FOUND);
    }

    public AuctionRoomImageNotFound(ErrorCode errorCode) {
        super(errorCode);
    }
}
