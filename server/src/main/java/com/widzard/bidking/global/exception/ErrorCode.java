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
     * Phone Verification
     */
    SENDING_MESSAGE_FAILURE(HttpStatus.CONFLICT, "SENDING_MESSAGE_FAILURE", "메세지 전송에 실패했습니다."),
    PHONE_DUPLICATED(HttpStatus.BAD_REQUEST, "ALREADY_VERIFIED_PHONE_NUMBER", "이미 인증된 번호입니다."),

    /*
     * Member
     */
    AUCTION_START_TIME_ERROR(HttpStatus.BAD_REQUEST, "AUCTION_START_TIME_ERROR", "경매방 시작시간 에러입니다."),
    INVALID_AUCTION_REQUEST_ERROR(HttpStatus.BAD_REQUEST, "INVALID_AUCTION_REQUEST_ERROR",
        "올바르지 않은 입력값입니다."),
    MEMBER_DUPLICATED(HttpStatus.BAD_REQUEST, "AlREADY_JOINED_MEMBER", "이미 존재하는 회원입니다."),
    INVALID_TOKEN(HttpStatus.FORBIDDEN, "INVALID_TOKEN", "유효하지 않은 토큰입니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "SC_FORBIDDEN", "해당 자원에 대한 권한이 없습니다."),

    /*
     * Auction
     */
    AUCTION_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "AUCTION_ROOM_NOT_FOUND",
        "해당 유저가 만든 경매방이 존재하지 않습니다."),

    /*
     * Item
     */
    Empty_Item_List(HttpStatus.NOT_FOUND, "EMPTY_ITEM_LIST", "아이템이 없습니다."),
    ITEM_CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "ITEM_CATEGORY_NOT_FOUND", "카테고리가 없습니다."),

    /*
     * Image
     */
    EMPTY_THUMBNAIL_EXCEPTION(HttpStatus.NOT_FOUND, "EMPTY_THUMBNAIL_EXCEPTION", "썸네일이 없습니다."),
    ITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "ITEM_NOT_FOUND", "아이템이 없습니다."),
    IMAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "IMAGE_NOT_FOUND", "이미지가 없습니다"),
    IMAGE_OPERATION_FAIL(HttpStatus.EXPECTATION_FAILED, "IMAGE_OPERATION_FAIL", "이미지 작업 실패"),
    IMAGE_NOT_SUFFICIENT(HttpStatus.NOT_FOUND, "IMAGE_NOT_SUFFICIENT", "이미지의 수가 일치하지 않습니다."),
    ALREADY_STARTED_AUCTIONROOM(HttpStatus.BAD_REQUEST, "NOT_BEFORE_LIVE", "이미 진행한 경매방입니다."),
    UNABLE_START_AUCTIONROOM(HttpStatus.BAD_REQUEST, "UNABLE_TO_START", "경매방을 시작할 수 없는 시간입니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
