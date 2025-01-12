package com.nzpmc.demo.controllers;

import com.nzpmc.demo.dto.student.StudentProfileDTO;
import com.nzpmc.demo.dto.student.StudentRegistrationDTO;
import com.nzpmc.demo.models.Account;
import com.nzpmc.demo.models.Student;
import com.nzpmc.demo.services.StudentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("student")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('STUDENT', 'ADMIN')")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("{id}")
    public ResponseEntity getStudent(@PathVariable String id) {
        try {
            StudentProfileDTO student = studentService.getStudentById(id);
            return ResponseEntity.ok(student);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student with id " + id + " not found.");
        }
    }

    @PutMapping("{id}")
    public ResponseEntity updateStudent(@PathVariable String id, @Valid @RequestBody StudentProfileDTO student) {
        try {
            Account updatedStudent = studentService.updateStudentDetails(id, student);
            return ResponseEntity.ok(updatedStudent);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student with id " + id + " not found.");
        }
    }

    @PostMapping
    public ResponseEntity createAccount(@Valid @RequestBody StudentRegistrationDTO studentRegistrationDTO) {
        try {
            studentService.createStudent(studentRegistrationDTO);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
}
