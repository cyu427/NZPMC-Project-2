package com.nzpmc.demo.controllers;

import com.nzpmc.demo.config.UserAuthenticationProvider;
import com.nzpmc.demo.dto.auth.CredentialsDTO;
import com.nzpmc.demo.dto.auth.UserLoginDTO;
import com.nzpmc.demo.dto.student.StudentRegistrationDTO;
import com.nzpmc.demo.services.AuthService;
import com.nzpmc.demo.services.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;
    private final StudentService studentService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid CredentialsDTO credentialsDto) {
        try {
            UserLoginDTO userLoginDTO = authService.login(credentialsDto);
            userLoginDTO.setToken(userAuthenticationProvider.createToken(userLoginDTO));
            return ResponseEntity.ok(userLoginDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Competition with username " + credentialsDto.getEmail() + " not found.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity createAccount(@Valid @RequestBody StudentRegistrationDTO studentRegistrationDTO) {
        try {
            studentService.createStudent(studentRegistrationDTO);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
