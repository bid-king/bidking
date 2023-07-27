package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class EmptyThumbnailException extends CustomBaseException {


    public EmptyThumbnailException(String message,
        ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public EmptyThumbnailException() {
        super(ErrorCode.EMPTY_THUMBNAIL_EXCEPTION);
    }
}
