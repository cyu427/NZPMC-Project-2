package com.nzpmc.demo.mapper.student;

import com.nzpmc.demo.dto.student.StudentProfileDTO;
import com.nzpmc.demo.models.Student;

public class StudentProfileMapper {

    public StudentProfileDTO convertToDTO(Student student) {
        StudentProfileDTO studentProfileDTO = new StudentProfileDTO();
        studentProfileDTO.setEmail(student.getEmail());
        studentProfileDTO.setFirstName(student.getFirstName());
        studentProfileDTO.setLastName(student.getLastName());
        studentProfileDTO.setIsHomeSchooled(student.isHomeSchooled());
        if (student.getSchool() != null) {
            studentProfileDTO.setSchool(student.getSchool());
        }
        return studentProfileDTO;
    }

    public Student convertToModel(Student student, StudentProfileDTO studentProfileDTO) {
        student.setEmail(studentProfileDTO.getEmail());
        student.setFirstName(studentProfileDTO.getFirstName());
        student.setLastName(studentProfileDTO.getLastName());
        student.setHomeSchooled(studentProfileDTO.getIsHomeSchooled());

        if (!student.isHomeSchooled()) {
            student.setSchool(studentProfileDTO.getSchool());
        }

        return student;
    }


}
