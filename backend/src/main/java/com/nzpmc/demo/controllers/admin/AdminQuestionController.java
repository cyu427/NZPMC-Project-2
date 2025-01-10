package com.nzpmc.demo.controllers.admin;

import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.services.QuestionService;
import com.nzpmc.demo.projection.ViewAllQuestionProjection;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("admin/question")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('ADMIN')")
public class AdminQuestionController {
    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity createQuestion(@Valid @RequestBody QuestionDTO questionDTO) {
        try {
            Question createdQuestion = questionService.createQuestion(questionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity updateQuestion(@PathVariable String id, @Valid @RequestBody QuestionDTO questionDTO) {
        try {
            Question updatedQuestion = questionService.editQuestion(id, questionDTO);
            return ResponseEntity.ok(updatedQuestion);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question with id " + id + " not found.");
        }
    }

    @GetMapping
    public ResponseEntity getAllQuestions() {
        try {
            List<ViewAllQuestionProjection> allQuestions = questionService.getAllQuestionOverview();
            return ResponseEntity.ok(allQuestions);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("{id}")
    public ResponseEntity getQuestion(@PathVariable String id) {
        try {
            QuestionDTO question = questionService.getQuestionById(id);
            return ResponseEntity.ok(question);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question with id " + id + " not found.");
        }
    }

}
