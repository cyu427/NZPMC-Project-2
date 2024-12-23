package com.nzpmc.demo.utils;

import com.nzpmc.demo.models.Role;
import com.nzpmc.demo.models.Student;
import org.springframework.beans.factory.annotation.Value;

public interface AccountProjection {
    String getId();  // Include the fields you need
    String getUsername();
    Role getRole();
    Student getStudent();
}
