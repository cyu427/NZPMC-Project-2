package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.mapper.question.QuestionMapper;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public Question createQuestion(QuestionDTO questionDTO) {
        Question question = new QuestionMapper().convertToModel(questionDTO);
        questionRepository.save(question);
        return question;
    }
}
