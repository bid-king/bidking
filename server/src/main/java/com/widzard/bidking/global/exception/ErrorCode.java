package com.widzard.bidking.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    /*
     * Global
     */
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "GLOBAL_INVALID_INPUT_VALUE", "올바르지 않은 입력값입니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "GLOBAL_METHOD_NOT_ALLOWED",
        "잘못된 HTTP 메서드를 호출했습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "GLOBAL_INTERNAL_SERVER_ERROR",
        "내부 서버 에러가 발생했습니다."),
    NOT_SUPPORTED_METHOD_ERROR(HttpStatus.METHOD_NOT_ALLOWED, "GLOBAL_NOT_SUPPORTED_METHOD_ERROR",
        "지원하지 않는 Method 요청입니다."),
    NOT_FOUND(HttpStatus.NOT_FOUND, "GLOBAL_404_ERROR", "404 에러입니다. 요청한 데이터를 서버가 찾을 수 없습니다."),

    /*
     * Member
     */
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "MEMBER_NOT_FOUND", "존재하지 않는 회원입니다."),


    /*
     * Member
     */
    AUCTION_START_TIME_ERROR(HttpStatus.BAD_REQUEST, "AUCTION_START_TIME_ERROR", "경매방 시작시간 에러입니다."),
    INVALID_AUCTION_REQUEST_ERROR(HttpStatus.BAD_REQUEST, "INVALID_AUCTION_REQUEST_ERROR",
        "올바르지 않은 입력값입니다."),
    MEMBER_DUPLICATED(HttpStatus.BAD_REQUEST, "AlREADY_JOINED_MEMBER", "이미 존재하는 회원입니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;


    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
