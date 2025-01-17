package com.nzpmc.demo.controllers.admin;

import com.nzpmc.demo.dto.student.GetAllStudentDTO;
import com.nzpmc.demo.services.StudentService;
import com.nzpmc.demo.projection.AccountProjection;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("admin/student")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('ADMIN')")
public class AdminAccountController {
    private final StudentService studentService;

    @GetMapping
    public ResponseEntity getAllStudents() {
        try {
            List<GetAllStudentDTO> allStudents = studentService.getAllStudents();
            return ResponseEntity.ok(allStudents);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
