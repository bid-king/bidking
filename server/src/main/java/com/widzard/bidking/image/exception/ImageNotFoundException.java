package com.widzard.bidking.image.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class ImageNotFoundException extends CustomBaseException {


    public ImageNotFoundException(String message,
        ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public ImageNotFoundException() {
        super(ErrorCode.IMAGE_NOT_FOUND);
    }
}
