package com.nzpmc.demo.models;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document("event")
@Getter @Setter
@NoArgsConstructor
@ToString
public class Event {
    @Id
    private String id;

    private String name;
    private Date dateTime;
    private String location;
    private double cost;
    private String description;

    @DBRef(lazy = true)
    private List<Student> participatingStudents;

    public Event(String name, Date dateTime, String location, double cost, String description) {
        this.name = name;
        this.dateTime = dateTime;
        this.location = location;
        this.cost = cost;
        this.description = description;
    }
}
