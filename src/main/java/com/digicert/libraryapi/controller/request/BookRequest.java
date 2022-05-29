package com.digicert.libraryapi.controller.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookRequest {
    private String title;
    private String author;
}
