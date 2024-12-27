package com.nzpmc.demo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document("attempt")
@Data
public class Attempt {
    @Id
    private String id;

    @DBRef(lazy = true)
    private Account account;

    @DBRef(lazy = true)
    private Competition competition;

    // key : The ObjectId of the question
    // value: The option chosen
    private Map<String, Option> attempts;
}
