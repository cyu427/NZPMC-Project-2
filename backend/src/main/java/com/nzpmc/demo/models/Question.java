package com.nzpmc.demo.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("question")
@Data
public class Question {
    @Id
    private String id;

    private String title;
    List<Option> options;
}
