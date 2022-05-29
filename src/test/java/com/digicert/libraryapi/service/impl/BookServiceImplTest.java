package com.digicert.libraryapi.service.impl;

import com.digicert.libraryapi.controller.response.BookResponse;
import com.digicert.libraryapi.exception.BookNotFoundException;
import com.digicert.libraryapi.persistance.entity.Book;
import com.digicert.libraryapi.persistance.repository.BookRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.digicert.libraryapi.util.TestUtil.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BookServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookServiceImpl bookService;

    @Test
    @DisplayName("test save book success")
    void save() {
        when(bookRepository.save(Mockito.any(Book.class)))
                .thenReturn(buildBook());
        BookResponse actualBookResponse = bookService.save(buildBookRequest());

        assertThat(actualBookResponse)
                .isNotNull()
                .hasNoNullFieldsOrProperties();
        assertThat(actualBookResponse.getAuthor()).isEqualTo("Bushy Given");
        assertThat(actualBookResponse.getTitle()).isEqualTo("first Book");
    }

    @Test
    @DisplayName("test that save book fails when book request not populated correctly")
    void saveFail() {
        assertThatThrownBy(() -> bookService.save(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("book request cannot be null");
    }

    @Test
    @DisplayName("test update book success")
    void update() {
        when(bookRepository.save(Mockito.any(Book.class)))
                .thenReturn(buildBook());
        BookResponse actualBookResponse = bookService.update(buildBookRequest(), 1L);

        assertThat(actualBookResponse)
                .isNotNull()
                .hasNoNullFieldsOrProperties();
        assertThat(actualBookResponse.getAuthor()).isEqualTo("Bushy Given");
        assertThat(actualBookResponse.getTitle()).isEqualTo("first Book");
    }

    @Test
    @DisplayName("test find book by a given id")
    void findById() {
        when(bookRepository.findById(1L))
                .thenReturn(Optional.of(buildBook()));

        BookResponse actualBookResponse = bookService.findById(1L);

        assertThat(actualBookResponse)
                .isNotNull()
                .hasNoNullFieldsOrProperties();
        assertThat(actualBookResponse.getAuthor()).isEqualTo("Bushy Given");
        assertThat(actualBookResponse.getTitle()).isEqualTo("first Book");

    }

    @Test
    @DisplayName("test existsById given id if present")
    void existsById() {
        when(bookRepository.existsById(1L)).thenReturn(true);
        boolean exists = bookService.existsById(1L);
        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("test existsById given incorrect id if not exist")
    void existsById_NotExist() {
        when(bookRepository.existsById(Mockito.anyLong())).thenReturn(false);
        boolean exists = bookService.existsById(1L);
        assertThat(exists).isFalse();
    }

    @Test
    @DisplayName("test find all books")
    void findAll() {
        when(bookRepository.findAll())
                .thenReturn(Stream.of(buildBook()).collect(Collectors.toSet()));
        List<BookResponse> bookResponses = bookService.findAll();

        assertThat(bookResponses)
                .isNotEmpty()
                .hasSize(1);
        assertThat(bookResponses.get(0).getAuthor()).isEqualTo("Bushy Given");
        assertThat(bookResponses.get(0).getTitle()).isEqualTo("first Book");
    }

    @Test
    @DisplayName("test find all books when there are no books in library")
    void findAll_BooksNotFound() {
        when(bookRepository.findAll())
                .thenReturn(new ArrayList<>());

        assertThatThrownBy(() -> bookService.findAll())
                .isInstanceOf(BookNotFoundException.class)
                .hasMessage("books not found");
    }

    @Test
    @DisplayName("test count books ")
    void count() {
        when(bookRepository.count())
                .thenReturn(5L);
        long actualCount = bookService.count();

        assertThat(actualCount).isEqualTo(5);

    }
}