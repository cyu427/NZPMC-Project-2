package com.nzpmc.demo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("competition")
@Data
public class Competition {
    @Id
    private String id;

    private String title;

    @DBRef(lazy = true)
    private List<Question> questions;


}
