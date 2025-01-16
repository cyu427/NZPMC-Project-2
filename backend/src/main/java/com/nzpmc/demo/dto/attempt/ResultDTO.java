package com.nzpmc.demo.dto.attempt;

import lombok.Data;

@Data
public class ResultDTO {
    private String id;
    private String email;
    private String lastName;
    private String firstName;
    private String school;
    private int grade;
}
