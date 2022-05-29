package com.digicert.libraryapi.persistance.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
@Entity
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "BOOK")
public class Book {
    @Id
    @GeneratedValue
    @ToString.Exclude
    @Column(name = "ID")
    private Long id;
    @Column(name = "TITLE")
    private String title;
    @Column(name = "AUTHOR")
    private String author;
    @Column(name = "CREATED_ON")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;

    @PrePersist
    private void prePersist(){
        createdOn = new Date();
    }

}
