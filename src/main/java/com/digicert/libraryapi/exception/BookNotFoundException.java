package com.digicert.libraryapi.exception;

import lombok.Getter;

@Getter
public class BookNotFoundException extends RuntimeException {
    private final String message;

    public BookNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
