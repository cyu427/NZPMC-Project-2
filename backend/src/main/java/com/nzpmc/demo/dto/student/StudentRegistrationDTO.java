package com.nzpmc.demo.dto.student;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
public class StudentRegistrationDTO {
    @NotNull(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @Valid
    private StudentProfileDTO studentProfile;
}
