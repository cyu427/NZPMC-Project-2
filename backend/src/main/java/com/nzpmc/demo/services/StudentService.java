package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.student.GetAllStudentDTO;
import com.nzpmc.demo.dto.student.StudentProfileDTO;
import com.nzpmc.demo.dto.student.StudentRegistrationDTO;
import com.nzpmc.demo.mapper.student.AllStudentMapper;
import com.nzpmc.demo.mapper.student.StudentProfileMapper;
import com.nzpmc.demo.mapper.student.StudentRegistrationMapper;
import com.nzpmc.demo.models.Account;
import com.nzpmc.demo.models.Role;
import com.nzpmc.demo.repository.AccountRepository;
import com.nzpmc.demo.projection.AccountProjection;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class StudentService {
    private final AccountRepository accountRepository;
    //private final StudentRepository studentRepository;

    public StudentProfileDTO getStudentById(String id) {
        Account account = accountRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));
        StudentProfileMapper studentProfileMapper = new StudentProfileMapper();
        return studentProfileMapper.convertToDTO(account);
    }

    public Account updateStudentDetails(String id, StudentProfileDTO studentProfileDTO) {
        Account account = accountRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));
        StudentProfileMapper studentProfileMapper = new StudentProfileMapper();
        account = studentProfileMapper.convertToModel(account, studentProfileDTO);
        accountRepository.save(account);
        return account;
    }

    public void createStudent(StudentRegistrationDTO studentRegistrationDTO) {
        // Check if a student with the same email already exists
        String email = studentRegistrationDTO.getEmail();
        accountRepository.findByUsername(email).ifPresent(existingStudent -> {
            throw new IllegalArgumentException("A student with this email already exists.");
        });

        // Convert DTO to Model and save the student
        Account account = new StudentRegistrationMapper().convertToModel(studentRegistrationDTO);
        account.setRole(Role.STUDENT);
        accountRepository.save(account);
    }

    public List<GetAllStudentDTO> getAllStudents() {
        List<Account> allStudents = accountRepository.findByRole(Role.STUDENT);
        AllStudentMapper allStudentMapper = new AllStudentMapper();
        return allStudents.stream()
                .map(allStudentMapper::convertToDTO)
                .toList();
    }



}
