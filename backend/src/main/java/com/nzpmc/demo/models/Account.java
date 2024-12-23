package com.nzpmc.demo.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document("account")
@Getter
@Setter
public class Account {
    @Id
    private String id;

    private String username;
    private String password;
    private Role role;
    private Student student;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;  // Check if both objects are the same
        if (obj == null || getClass() != obj.getClass()) return false; // Check if obj is of same class

        Account account = (Account) obj;
        return id != null && id.equals(account.id);  // Compare based on student ID
    }

    // Override hashCode to generate hashCode based on student ID
    @Override
    public int hashCode() {
        return Objects.hash(id);  // Hash based on the student ID
    }
}
