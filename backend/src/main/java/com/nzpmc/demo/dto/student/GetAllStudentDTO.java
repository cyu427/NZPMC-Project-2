package com.nzpmc.demo.dto.student;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GetAllStudentDTO {
    private String id;

    @NotNull(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    private String email;

    @NotNull(message = "First name is required")
    private String firstName;

    @NotNull(message = "Last name is required")
    private String lastName;

    private String school;
}
