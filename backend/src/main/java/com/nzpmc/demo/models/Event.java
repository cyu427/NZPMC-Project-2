package com.nzpmc.demo.models;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Document("event")
@Data
public class Event {
    @Id
    private String id;

    private String name;
    private Date dateTime;
    private String location;
    private double cost;
    private String description;
    private Date endDateTime;

    @DBRef(lazy = true)
    private Competition competition;

    @DBRef(lazy = true)
    private List<Account> participatingStudents;

//    public Event(String name, Date dateTime, String location, double cost, String description) {
//        this.name = name;
//        this.dateTime = dateTime;
//        this.location = location;
//        this.cost = cost;
//        this.description = description;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


}
