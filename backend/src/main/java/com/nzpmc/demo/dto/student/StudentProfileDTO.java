package com.nzpmc.demo.dto.student;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import lombok.*;
import jakarta.validation.constraints.NotNull;


@Data
public class StudentProfileDTO {
    @NotNull(message = "First name is required")
    private String firstName;

    @NotNull(message = "Last name is required")
    private String lastName;

    @NotNull(message = "isHomeSchooled is required")
    private Boolean isHomeSchooled;

    private String school;

    @AssertTrue(message = "School is required when not home-schooled. School cannot be provided when student is homeschooled")
    public boolean isSchoolValid() {
        if (isHomeSchooled == null) {
            return true;
        }

        if (isHomeSchooled ) {
            return school == null || school.trim().isEmpty();
        } else {
            return school != null && !school.trim().isEmpty();
        }
    }

    @AssertTrue(message = "School cannot be provided when isHomeSchool is not provided")
    public boolean isSchoolWhenNotHomeSchooled() {
        return isHomeSchooled != null || (school == null || school.trim().isEmpty());
    }
}
