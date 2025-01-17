package com.nzpmc.demo.mapper.student;

import com.nzpmc.demo.dto.student.GetAllStudentDTO;
import com.nzpmc.demo.models.Account;
import com.nzpmc.demo.models.Student;

public class AllStudentMapper {
    public GetAllStudentDTO convertToDTO(Account account) {
        GetAllStudentDTO dto = new GetAllStudentDTO();
        Student student = account.getStudent();

        dto.setId(account.getId());
        dto.setEmail(account.getUsername());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setSchool(student.getSchool());

        return dto;
    }
}
