package com.digicert.libraryapi.controller.response;

import com.digicert.libraryapi.persistance.entity.Book;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponse {
    private String title;
    private String author;
    private Date createdOn;

    public static BookResponse buildResponse(Book book){
        return BookResponse.builder()
                .author(book.getAuthor())
                .title(book.getTitle())
                .createdOn(book.getCreatedOn()).build();
    }
}
