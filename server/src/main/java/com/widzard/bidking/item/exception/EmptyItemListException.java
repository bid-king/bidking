package com.widzard.bidking.item.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class EmptyItemListException extends CustomBaseException {

    public EmptyItemListException(String message,
        ErrorCode errorCode) {
        super(message, errorCode);
    }

    public EmptyItemListException() {
        super(ErrorCode.Empty_Item_List);
    }
}
