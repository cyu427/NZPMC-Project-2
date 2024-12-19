package com.nzpmc.demo.models;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;  // Check if both objects are the same
        if (obj == null || getClass() != obj.getClass()) return false; // Check if obj is of same class

        Student student = (Student) obj;
        return id != null && id.equals(student.id);  // Compare based on student ID
    }

    // Override hashCode to generate hashCode based on student ID
    @Override
    public int hashCode() {
        return Objects.hash(id);  // Hash based on the student ID
    }

}
