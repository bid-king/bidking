package com.widzard.bidking.item.exception;

import com.widzard.bidking.global.exception.CustomBaseException;
import com.widzard.bidking.global.exception.ErrorCode;

public class ItemCategoryNotFoundException extends CustomBaseException {


    public ItemCategoryNotFoundException(String message,
        ErrorCode errorCode) {
        super(errorCode.getMessage(), errorCode);
    }

    public ItemCategoryNotFoundException() {
        super(ErrorCode.ITEM_CATEGORY_NOT_FOUND);
    }
}
