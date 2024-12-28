package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.event.EventDetailDTO;
import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.mapper.event.EventDetailMapper;
import com.nzpmc.demo.mapper.question.QuestionMapper;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public Question createQuestion(QuestionDTO questionDTO) {
        Question question = new QuestionMapper().convertToModel(questionDTO);
        questionRepository.save(question);
        return question;
    }

    public Question editQuestion(String id, QuestionDTO questionDTO) {
        questionRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find question with id"));
        Question question = new QuestionMapper().convertToModel(questionDTO);
        question.setId(id);
        questionRepository.save(question);
        return question;
    }
}
