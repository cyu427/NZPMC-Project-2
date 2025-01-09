//package com.nzpmc.demo.mapper.student;
//
//import com.nzpmc.demo.dto.student.StudentProfileDTO;
//import com.nzpmc.demo.models.Student;
//
//public class StudentProfileMapper {
//
//    public StudentProfileDTO convertToDTO(Student student) {
//        StudentProfileDTO studentProfileDTO = new StudentProfileDTO();
//        studentProfileDTO.setEmail(student.getEmail());
//        studentProfileDTO.setFirstName(student.getFirstName());
//        studentProfileDTO.setLastName(student.getLastName());
//        studentProfileDTO.setIsHomeSchooled(student.isHomeSchooled());
//        if (student.getSchool() != null) {
//            studentProfileDTO.setSchool(student.getSchool());
//        }
//        return studentProfileDTO;
//    }
//
//    public Student convertToModel(Student student, StudentProfileDTO studentProfileDTO) {
//        student.setEmail(studentProfileDTO.getEmail());
//        student.setFirstName(studentProfileDTO.getFirstName());
//        student.setLastName(studentProfileDTO.getLastName());
//        student.setHomeSchooled(studentProfileDTO.getIsHomeSchooled());
//
//        if (!student.isHomeSchooled()) {
//            student.setSchool(studentProfileDTO.getSchool());
//        }
//
//        return student;
//    }
//
//
//}

package com.nzpmc.demo.mapper.student;

import com.nzpmc.demo.dto.student.StudentProfileDTO;
import com.nzpmc.demo.models.Account;
import com.nzpmc.demo.models.Student;

public class StudentProfileMapper {

    public StudentProfileDTO convertToDTO(Account account) {
        StudentProfileDTO studentProfileDTO = new StudentProfileDTO();
        Student studentDetail = account.getStudent();

        studentProfileDTO.setFirstName(account.getStudent().getFirstName());
        studentProfileDTO.setLastName(studentDetail.getLastName());
        studentProfileDTO.setIsHomeSchooled(studentDetail.isHomeSchooled());
        if (studentDetail.getSchool() != null) {
            studentProfileDTO.setSchool(studentDetail.getSchool());
        }
        return studentProfileDTO;
    }

    public Account convertToModel(Account account, StudentProfileDTO studentProfileDTO) {
        Student studentDetail = new Student();
        studentDetail.setFirstName(studentProfileDTO.getFirstName());
        studentDetail.setLastName(studentProfileDTO.getLastName());
        studentDetail.setHomeSchooled(studentProfileDTO.getIsHomeSchooled());

        if (!studentDetail.isHomeSchooled()) {
            studentDetail.setSchool(studentProfileDTO.getSchool());
        }
        account.setStudent(studentDetail);

        return account;
    }


}
