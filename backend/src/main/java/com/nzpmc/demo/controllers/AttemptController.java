package com.nzpmc.demo.controllers;

import com.nzpmc.demo.dto.student.StudentRegistrationDTO;
import com.nzpmc.demo.models.Option;
import com.nzpmc.demo.services.AttemptService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("attempt")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('STUDENT')")
public class AttemptController {
    private AttemptService attemptService;

    @PostMapping("/{userId}/{competitionId}")
    public ResponseEntity submitCompetition(@PathVariable String userId, @PathVariable String competitionId, @RequestBody Map<String, Option> attempts) {
        try {
            attemptService.submitAttempt(userId, competitionId, attempts);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
