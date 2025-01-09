package com.nzpmc.demo.mapper.student;

import com.nzpmc.demo.dto.student.StudentProfileDTO;
import com.nzpmc.demo.dto.student.StudentRegistrationDTO;
import com.nzpmc.demo.models.Account;
import com.nzpmc.demo.models.Student;

//public class StudentRegistrationMapper {
//    public Student convertToModel(StudentRegistrationDTO studentRegistrationDTO) {
//        Student student = new Student();
//        String password = studentRegistrationDTO.getPassword();
//        StudentProfileDTO studentProfileDTO = studentRegistrationDTO.getStudentProfile();
//        StudentProfileMapper studentProfileMapper = new StudentProfileMapper();
//        student = studentProfileMapper.convertToModel(student, studentProfileDTO);
//        student.setPassword(password);
//        return student;
//    }
//}

public class StudentRegistrationMapper {
    public Account convertToModel(StudentRegistrationDTO studentRegistrationDTO) {
        Account account = new Account();

        StudentProfileDTO studentProfileDTO = studentRegistrationDTO.getStudentProfile();
        StudentProfileMapper studentProfileMapper = new StudentProfileMapper();
        account = studentProfileMapper.convertToModel(account, studentProfileDTO);
        account.setUsername(studentRegistrationDTO.getEmail());
        account.setPassword(studentRegistrationDTO.getPassword());
        return account;
    }
}








