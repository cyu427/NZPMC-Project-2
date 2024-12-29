package com.nzpmc.demo.projection;

import com.nzpmc.demo.models.Role;
import com.nzpmc.demo.models.Student;

public interface AccountProjection {
    String getId();  // Include the fields you need
    String getUsername();
    Role getRole();
    Student getStudent();
}
