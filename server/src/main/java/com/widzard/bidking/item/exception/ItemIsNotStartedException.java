package com.widzard.bidking.item.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class ItemIsNotStartedException extends CustomBaseException {

    public ItemIsNotStartedException() {
        super(ErrorCode.ITEM_BID_NOT_STARTED);
    }

    public ItemIsNotStartedException(ErrorCode errorCode) {
        super(errorCode);
    }
}
