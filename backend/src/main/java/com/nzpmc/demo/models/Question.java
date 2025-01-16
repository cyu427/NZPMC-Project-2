package com.nzpmc.demo.models;

import com.nzpmc.demo.models.enums.Difficulty;
import com.nzpmc.demo.models.enums.Topic;
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

    private Difficulty difficulty;
    private Topic topic;
}
