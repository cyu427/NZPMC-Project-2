package com.nzpmc.demo.mapper.student;

import com.nzpmc.demo.dto.student.StudentProfileDTO;
import com.nzpmc.demo.dto.student.StudentRegistrationDTO;
import com.nzpmc.demo.models.Student;

public class StudentRegistrationMapper {
    public Student convertToModel(StudentRegistrationDTO studentRegistrationDTO) {
        Student student = new Student();
        String password = studentRegistrationDTO.getPassword();
        StudentProfileDTO studentProfileDTO = studentRegistrationDTO.getStudentProfile();
        StudentProfileMapper studentProfileMapper = new StudentProfileMapper();
        student = studentProfileMapper.convertToModel(student, studentProfileDTO);
        student.setPassword(password);
        return student;
    }
}
