package com.nzpmc.demo.controllers;

import com.nzpmc.demo.dto.competition.ViewCompetitionDTO;
import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.services.CompetitionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("competition")
@AllArgsConstructor
public class CompetitionController {
    private final CompetitionService competitionService;

    @GetMapping("{id}")
    public ResponseEntity getCompetition(@PathVariable String id) {
        try {
            ViewCompetitionDTO competition = competitionService.getCompetition(id);
            return ResponseEntity.ok(competition);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Competition with id " + id + " not found.");
        }
    }
}
