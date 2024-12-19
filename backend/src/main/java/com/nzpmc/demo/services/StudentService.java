package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.student.StudentProfileDTO;
import com.nzpmc.demo.dto.student.StudentRegistrationDTO;
import com.nzpmc.demo.mapper.student.StudentProfileMapper;
import com.nzpmc.demo.mapper.student.StudentRegistrationMapper;
import com.nzpmc.demo.models.Student;
import com.nzpmc.demo.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentProfileDTO getStudentById(String id) {
        Student student = studentRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));
        StudentProfileMapper studentProfileMapper = new StudentProfileMapper();
        return studentProfileMapper.convertToDTO(student);
    }

    public Student updateStudentDetails(String id, StudentProfileDTO studentProfileDTO) {
        Student student = studentRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));
        StudentProfileMapper studentProfileMapper = new StudentProfileMapper();
        student = studentProfileMapper.convertToModel(student, studentProfileDTO);
        studentRepository.save(student);
        return student;
    }

    public void createStudent(StudentRegistrationDTO studentRegistrationDTO) {
        // Check if a student with the same email already exists
        String email = studentRegistrationDTO.getStudentProfile().getEmail();
        studentRepository.findByEmail(email).ifPresent(existingStudent -> {
            throw new IllegalArgumentException("A student with this email already exists.");
        });

        // Convert DTO to Model and save the student
        Student student = new StudentRegistrationMapper().convertToModel(studentRegistrationDTO);
        studentRepository.save(student);
    }



}
