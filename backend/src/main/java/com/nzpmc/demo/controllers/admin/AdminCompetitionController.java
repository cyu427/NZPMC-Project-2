package com.nzpmc.demo.controllers.admin;

import com.nzpmc.demo.dto.competition.CreateCompetitionDTO;
import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.services.CompetitionService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("admin/competition")
@AllArgsConstructor
public class AdminCompetitionController {
    private final CompetitionService competitionService;

    @PostMapping
    public ResponseEntity createQuestion(@Valid @RequestBody CreateCompetitionDTO createCompetitionDTO) {
        try {
            Competition createdCompetition = competitionService.createCompetition(createCompetitionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCompetition);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("{competitionId}/{questionId}")
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


}
