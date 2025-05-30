package com.digicert.libraryapi.controller.advice;

import com.digicert.libraryapi.exception.BookNotFoundException;
import com.digicert.libraryapi.exception.LibraryApiError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        String error = "Malformed JSON request";
        return buildResponseEntity(new LibraryApiError(HttpStatus.BAD_REQUEST, error, ex));
    }

    private ResponseEntity<Object> buildResponseEntity(LibraryApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<Object> handleBookNotFoundRequest(BookNotFoundException ex) {
        logException(ex);
        return buildResponseEntity(new LibraryApiError(HttpStatus.NOT_FOUND, ex));
    }


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleBadRequest(IllegalArgumentException ex) {
        logException(ex);
        return buildResponseEntity(new LibraryApiError(HttpStatus.BAD_REQUEST, ex));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericExceptions(Exception ex) {
        logException(ex);
        return buildResponseEntity(new LibraryApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex));
    }

    private <T extends Throwable> void logException(T exception){
        log.error("error processing request : {}", exception.getMessage(), exception);
    }
}
