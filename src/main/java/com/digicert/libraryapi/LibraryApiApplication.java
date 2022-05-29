package com.digicert.libraryapi;

import com.digicert.libraryapi.controller.request.BookRequest;
import com.digicert.libraryapi.persistance.repository.BookRepository;
import com.digicert.libraryapi.service.BookService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@OpenAPIDefinition(info =
@Info(title = "Library API", version = "v1.0"))
public class LibraryApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryApiApplication.class, args);
    }

    @Bean //init inmemory Data for test
    ApplicationRunner applicationRunner(BookService bookService){
        return args -> bookService.save(BookRequest.builder()
                .author("Bushy Given")
                .title("first Book")
                .build());
    }

}
