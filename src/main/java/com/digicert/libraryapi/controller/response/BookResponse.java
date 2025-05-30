package com.digicert.libraryapi.controller.response;

import com.digicert.libraryapi.persistance.entity.Book;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponse {
    private Long id;
    private String title;
    private String author;
    private Date createdOn;

    public static BookResponse buildResponse(Book book){
        return BookResponse.builder()
                .id(book.getId())
                .author(book.getAuthor())
                .title(book.getTitle())
                .createdOn(book.getCreatedOn()).build();
    }
}
