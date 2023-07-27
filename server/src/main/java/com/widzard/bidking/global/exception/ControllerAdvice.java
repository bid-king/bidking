package com.widzard.bidking.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    /*
     * business custom exception 발생
     */
    @ExceptionHandler(CustomBaseException.class)
    protected ResponseEntity<ErrorResponse> handle(CustomBaseException e) {
        log.error("Business CustomException: {}", e.getMessage());
        return createErrorResponseEntity(e.getErrorCode());
    }

    /*
     * custom exception 외 server error
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handle(Exception e) {
        e.printStackTrace();
        log.error("Exception: {}", e.getMessage());
        return createErrorResponseEntity(ErrorCode.INTERNAL_SERVER_ERROR);
    }

    /*
     * 지원하지 않는 메서드 호출시 발생하는 예외 처리
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ResponseEntity<ErrorResponse> handle(HttpRequestMethodNotSupportedException e) {
        log.error("HttpRequestMethodNotSupportedException: {}", e.getMessage());
        return createErrorResponseEntity(ErrorCode.METHOD_NOT_ALLOWED);
    }

    /*
     *404 예외처리 핸들러
     */
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponse> handle404(NoHandlerFoundException e) {
        log.error("NoHandlerFoundException: {}", e.getMessage());
        return createErrorResponseEntity(ErrorCode.NOT_FOUND);
    }

    // 401, 403, valid TODO

    private ResponseEntity<ErrorResponse> createErrorResponseEntity(ErrorCode errorCode) {
        return new ResponseEntity<>(ErrorResponse.of(errorCode), errorCode.getStatus());
    }

}

