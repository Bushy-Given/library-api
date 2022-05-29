package com.digicert.libraryapi.controller;

import com.digicert.libraryapi.controller.advice.RestExceptionHandler;
import com.digicert.libraryapi.controller.request.BookRequest;
import com.digicert.libraryapi.service.BookService;
import com.digicert.libraryapi.util.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static com.digicert.libraryapi.util.TestUtil.buildBookRequest;
import static com.digicert.libraryapi.util.TestUtil.buildBookResponse;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class BookControllerTest {

    private MockMvc mockMvc;
    @Mock
    private BookService bookService;
    @InjectMocks
    private BookController bookController;

    @BeforeEach
    public void setUp() {
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(bookController)
                .setControllerAdvice(RestExceptionHandler.class)
                .build();
    }

    @Test
    @DisplayName("test book created successfully using /book/add URI and return status 201-CREATED")
    void save() throws Exception {

        when(bookService.save(any(BookRequest.class)))
                .thenReturn(buildBookResponse());

        mockMvc.perform(post("/books/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonUtil.toJson(buildBookRequest())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("first Book"))
                .andExpect(jsonPath("$.author").value("Bushy Given"))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @DisplayName("test book updated successfully using /book/update URI return status 200-OK")
    void update() throws Exception {

        when(bookService.save(any(BookRequest.class)))
                .thenReturn(buildBookResponse());

        mockMvc.perform(put("/books/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonUtil.toJson(buildBookRequest())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("first Book"))
                .andExpect(jsonPath("$.author").value("Bushy Given"))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @DisplayName("test findById  success using passing books/1 on URI and return status 200-OK")
    void findById() throws Exception {

        when(bookService.findById(1L))
                .thenReturn(buildBookResponse());

        mockMvc.perform(get("/books/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("first Book"))
                .andExpect(jsonPath("$.author").value("Bushy Given"))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @DisplayName("test existsById success return status 200-OK")
    void existsById() throws Exception {
        when(bookService.existsById(1L))
                .thenReturn(Boolean.TRUE);

        mockMvc.perform(get("/books/exists/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    @DisplayName("test findAll success return status 200-OK")
    void findAll() throws Exception {
        when(bookService.findAll())
                .thenReturn(List.of(buildBookResponse()));

        mockMvc.perform(get("/books/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @DisplayName("test count success return status 200-OK")
    void count() throws Exception {
        when(bookService.count())
                .thenReturn(3L);

        mockMvc.perform(get("/books/count")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

}