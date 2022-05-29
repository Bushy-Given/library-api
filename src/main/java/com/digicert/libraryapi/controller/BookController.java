package com.digicert.libraryapi.controller;

import com.digicert.libraryapi.controller.request.BookRequest;
import com.digicert.libraryapi.controller.response.BookResponse;
import com.digicert.libraryapi.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "BOOKS")
@RestController
@RequestMapping("books/")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "save books given book request")
    public BookResponse save(@RequestBody BookRequest book) {
        return bookService.save(book);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "update books given book request")
    public BookResponse update(@RequestBody BookRequest book, Long id) {
        return bookService.update(book, id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "find book for a given id")
    public BookResponse findById(@PathVariable Long id) {
        return bookService.findById(id);
    }

    @GetMapping("/exists/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "given an id this operation checks if the book exists ")
    public boolean existsById(@PathVariable Long id) {
        return bookService.existsById(id);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "finds all the books in the library")
    public List<BookResponse> findAll() {
        return bookService.findAll();
    }

    @GetMapping("/count")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "count books in the library")
    public long count() {
        return bookService.count();
    }

    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "delete a book for a given id")
    public void deleteById(@PathVariable Long id) {
        bookService.deleteById(id);
    }
}
