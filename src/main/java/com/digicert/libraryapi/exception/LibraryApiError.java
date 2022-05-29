package com.digicert.libraryapi.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@Setter
public class LibraryApiError {
    private HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private String message;
    private String debugMessage;

    private LibraryApiError() {
        timestamp = LocalDateTime.now();
    }

    public LibraryApiError(HttpStatus status, Throwable ex) {
        this();
        this.status = status;
        this.message = "an error occurred";
        this.debugMessage = ex.getLocalizedMessage();
    }

    public LibraryApiError(HttpStatus status, String message, Throwable ex) {
        this();
        this.status = status;
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }
}