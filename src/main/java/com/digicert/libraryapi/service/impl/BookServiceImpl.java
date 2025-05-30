package com.digicert.libraryapi.service.impl;

import com.digicert.libraryapi.controller.request.BookRequest;
import com.digicert.libraryapi.controller.response.BookResponse;
import com.digicert.libraryapi.exception.BookNotFoundException;
import com.digicert.libraryapi.persistance.entity.Book;
import com.digicert.libraryapi.persistance.repository.BookRepository;
import com.digicert.libraryapi.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.digicert.libraryapi.controller.response.BookResponse.buildResponse;
import static java.util.stream.StreamSupport.stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public BookResponse save(BookRequest bookRequest) {
        log.info("bookService.save entered with request : {} ", bookRequest);
        validateRequest(bookRequest);
        Book buildBook = Book.builder()
                .author(bookRequest.getAuthor())
                .title(bookRequest.getTitle()).build();
        BookResponse bookResponse = buildResponse(bookRepository.save(buildBook));
        log.info("save success response: {}", bookResponse);
        return bookResponse;
    }

    @Override
    public BookResponse update(BookRequest bookRequest, Long id) {
        log.info("bookService.update entered with request : {} and id:{}", bookRequest, id);
        validateRequest(bookRequest);
        
        // Check if book exists
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Book not found with id: " + id);
        }

        Book buildBook = Book.builder()
                .id(id)
                .author(bookRequest.getAuthor())
                .title(bookRequest.getTitle()).build();
        BookResponse bookResponse = buildResponse(bookRepository.save(buildBook));
        log.info("update success response: {}", bookResponse);
        return bookResponse;
    }

    @Override
    public BookResponse findById(Long id) {
        log.info("bookService.findById entered with id : {} ", id);
        Optional<Book> book = bookRepository.findById(id);
        log.info("completed book: {}", book);
        return buildResponse(book.orElseThrow(() -> new BookNotFoundException("book not found with id: " + id)));
    }

    @Override
    public boolean existsById(Long id) {
        log.info("bookService.existsById entered with id : {} ", id);
        boolean exists = bookRepository.existsById(id);
        log.info("exists: {}", exists);
        return exists;
    }

    @Override
    public List<BookResponse> findAll() {
        log.info("bookService.findAll entered");
        Iterable<Book> books = bookRepository.findAll();

        List<BookResponse> bookResponses = stream(books.spliterator(), false)
                .map(BookResponse::buildResponse)
                .sorted(Comparator
                        .comparing(BookResponse::getCreatedOn)
                        .thenComparing(BookResponse::getTitle)
                        .reversed())
                .collect(Collectors.toList());
        if (bookResponses.isEmpty()) {
            log.error("find all books returned empty list ");
            throw new BookNotFoundException("books not found");
        }
        log.info("findAll success response:{}", bookResponses);
        return bookResponses;
    }

    @Override
    public long count() {
        log.info("bookService.count entered");
        long count = bookRepository.count();
        log.info("count completed:{}", count);
        return count;
    }

    @Override
    public void deleteById(Long id) {
        log.info("bookService.deleteById entered with id: {}", id);
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
        log.info("deleteById completed successfully for id: {}", id);
    }

    private void validateRequest(BookRequest bookRequest) {
        Assert.notNull(bookRequest, "book request cannot be null");
        Assert.hasText(bookRequest.getAuthor(), "author cannot be empty");
        Assert.hasText(bookRequest.getTitle(), "title cannot be empty");
    }
}
