package com.nzpmc.demo.models;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("student")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Student {
    @Id
    private String id;

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private boolean isHomeSchooled;
    private String school;

    @DBRef(lazy = true)
    private List<Event> eventsParticipated;
}
