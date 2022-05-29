package com.digicert.libraryapi.util;


import com.digicert.libraryapi.controller.request.BookRequest;
import com.digicert.libraryapi.controller.response.BookResponse;
import com.digicert.libraryapi.persistance.entity.Book;

import java.util.Date;

public class TestUtil {

    public static BookRequest buildBookRequest() {
        return BookRequest.builder()
                .author("Bushy Given")
                .title("first Book")
                .build();
    }

    public static BookResponse buildBookResponse() {
        return BookResponse.builder()
                .title("first Book").author("Bushy Given")
                .createdOn(new Date())
                .build();
    }

    public static Book buildBook(){
        return Book.builder()
                .id(1L)
                .title("first Book").author("Bushy Given")
                .createdOn(new Date())
                .build();
    }
}
