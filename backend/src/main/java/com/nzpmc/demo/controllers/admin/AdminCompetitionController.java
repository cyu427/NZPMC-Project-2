package com.nzpmc.demo.controllers.admin;

import com.nzpmc.demo.dto.competition.CreateCompetitionDTO;
import com.nzpmc.demo.dto.competition.ViewCompetitionDTO;
import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.projection.ViewAllCompetitionProjection;
import com.nzpmc.demo.projection.ViewAllQuestionProjection;
import com.nzpmc.demo.services.CompetitionService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("admin/competition")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('ADMIN')")
public class AdminCompetitionController {
    private final CompetitionService competitionService;

    @PostMapping
    public ResponseEntity createCompetition(@Valid @RequestBody CreateCompetitionDTO createCompetitionDTO) {
        try {
            Competition createdCompetition = competitionService.createCompetition(createCompetitionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCompetition);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("addQuestionToCompetition/{competitionId}/{questionId}")
    public ResponseEntity addQuestionToCompetition(@PathVariable String competitionId, @PathVariable String questionId) {
        try {
            competitionService.addQuestionToCompetition(competitionId, questionId);
            return ResponseEntity.ok("Question with id " + questionId + " successfully added to competition with id " + competitionId);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity getAllCompetitions() {
        try {
            List<ViewAllCompetitionProjection> allCompetitions = competitionService.getAllCompetitions();
            return ResponseEntity.ok(allCompetitions);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("addCompetitionToEvent/{competitionId}/{eventId}")
    public ResponseEntity addCompetitionToEvent(@PathVariable String competitionId, @PathVariable String eventId) {
        try {
            competitionService.addCompetitionToEvent(competitionId, eventId);
            return ResponseEntity.ok("Competition with id " + competitionId + " successfully added to event with id " + eventId);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("removeCompetitionFromEvent/{competitionId}/{eventId}")
    public ResponseEntity removeCompetitionFromEvent(@PathVariable String competitionId, @PathVariable String eventId) {
        try {
            competitionService.removeCompetitionFromEvent(competitionId, eventId);
            return ResponseEntity.ok("Competition with id " + competitionId + " successfully removed from event with id " + eventId);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred.");
        }
    }

    @GetMapping("{id}")
    public ResponseEntity getCompetition(@PathVariable String id) {
        try {
            ViewCompetitionDTO competition = competitionService.getCompetition(id);
            return ResponseEntity.ok(competition);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Competition with id " + id + " not found.");
        }
    }

    @DeleteMapping("removeQuestionFromCompetition/{competitionId}/{questionId}")
    public ResponseEntity removeQuestionFromCompetition(@PathVariable String competitionId, @PathVariable String questionId) {
        try {
            competitionService.removeQuestionFromCompetition(competitionId, questionId);
            return ResponseEntity.ok("Question removed successfully from competition.");
        } catch (NoSuchElementException e) {
            // Return a 404 Not Found if the competition or question is not found
            return ResponseEntity.status(404).body("Competition or Question not found.");
        } catch (IllegalArgumentException e) {
            // Return a 400 Bad Request if the question is not associated with the competition
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Catch any other exceptions and return a generic error message
            return ResponseEntity.status(500).body("An error occurred while removing the question.");
        }
    }




}
