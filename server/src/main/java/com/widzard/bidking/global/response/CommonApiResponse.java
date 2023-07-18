package com.widzard.bidking.global.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public final class CommonApiResponse<T> {

    private final boolean success;
    private final T data;
    private final ErrorResponse error;

    public static <T> CommonApiResponse<T> success(T data) {
        return new CommonApiResponse<>(true, data, null);
    }

    public static <T> CommonApiResponse<T> fail(ErrorResponse error) {
        return new CommonApiResponse<>(false, null, error);
    }

    static class ErrorResponse {

    }


}
