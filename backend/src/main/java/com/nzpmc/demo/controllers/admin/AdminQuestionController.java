package com.nzpmc.demo.controllers.admin;

import com.nzpmc.demo.dto.event.EventDetailDTO;
import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.services.EventService;
import com.nzpmc.demo.services.QuestionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("admin/question")
@AllArgsConstructor
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

}
