package com.nzpmc.demo.controllers.admin;

import com.nzpmc.demo.dto.attempt.MarkCompetitionDTO;
import com.nzpmc.demo.services.AttemptService;
import com.nzpmc.demo.services.CompetitionService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("admin/attempt")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('ADMIN')")
public class AdminAttemptController {
    private final CompetitionService competitionService;
    private AttemptService attemptService;

    @GetMapping("/{competitionId}")
    public ResponseEntity markCompetition(@PathVariable String competitionId) {
        try {
            MarkCompetitionDTO markedCompetition = attemptService.markAttempt(competitionId);
            return ResponseEntity.ok(markedCompetition);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Competition with id " + competitionId + " not found.");
        }
    }
}
