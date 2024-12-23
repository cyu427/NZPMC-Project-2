package com.nzpmc.demo.models;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("school")
@Getter @Setter
@NoArgsConstructor
@ToString
public class School {

    @Id
    private String id;

    private String schoolName;
    private int eqiNum;

    public School(String schoolName, int eqiNum) {
        this.schoolName = schoolName;
        this.eqiNum = eqiNum;
    }
}
