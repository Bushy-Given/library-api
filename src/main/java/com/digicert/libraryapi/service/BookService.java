package com.digicert.libraryapi.service;

import com.digicert.libraryapi.controller.request.BookRequest;
import com.digicert.libraryapi.controller.response.BookResponse;
import com.digicert.libraryapi.persistance.entity.Book;

import java.util.List;

public interface BookService {

    BookResponse save(BookRequest book);

    BookResponse update(BookRequest bookRequest, Long id);

    BookResponse findById(Long id);

    boolean existsById(Long id);

    List<BookResponse> findAll();

    long count();

    void deleteById(Long id);
}
