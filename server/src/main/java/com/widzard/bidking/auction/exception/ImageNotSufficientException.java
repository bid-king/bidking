package com.widzard.bidking.auction.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class ImageNotSufficientException extends CustomBaseException {

    public ImageNotSufficientException(String message, ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public ImageNotSufficientException() {
        super(ErrorCode.IMAGE_NOT_SUFFICIENT);
    }
}
