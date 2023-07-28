package com.widzard.bidking.image.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class ImageOperationFailException extends CustomBaseException {


    public ImageOperationFailException(String message,
        ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public ImageOperationFailException() {
        super(ErrorCode.IMAGE_OPERATION_FAIL_EXCEPTION);
    }
}
