package com.nzpmc.demo.mapper.question;

import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.models.Question;

public class QuestionMapper {
    public Question convertToModel(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setTitle(questionDTO.getQuestion());
        question.setOptions(questionDTO.getOptions());
        return question;
    }

    public QuestionDTO convertToDTO(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setQuestion(question.getTitle());
        questionDTO.setOptions(question.getOptions());
        return questionDTO;
    }
}
