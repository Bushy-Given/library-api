package com.digicert.libraryapi.persistance.repository;

import com.digicert.libraryapi.persistance.entity.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
}
