package com.nzpmc.demo.mapper.question;

import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.models.enums.Difficulty;
import com.nzpmc.demo.models.enums.Topic;

public class QuestionMapper {
    public Question convertToModel(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setTitle(questionDTO.getQuestion());
        question.setOptions(questionDTO.getOptions());

        switch(questionDTO.getDifficulty()) {
            case "MEDIUM":
                question.setDifficulty(Difficulty.MEDIUM);
                break;
            case "HARD":
                question.setDifficulty(Difficulty.HARD);
                break;
            default:
                question.setDifficulty(Difficulty.EASY);
                break;
        }

        switch(questionDTO.getTopic()) {
            case "WAVES":
                question.setTopic(Topic.WAVES);
                break;
            case "ALGEBRA":
                question.setTopic(Topic.ALGEBRA);
                break;
            case "GEOMETRY":
                question.setTopic(Topic.GEOMETRY);
                break;
            default:
                question.setTopic(Topic.MECHANICS);
                break;
        }

        return question;
    }

    public QuestionDTO convertToDTO(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setQuestion(question.getTitle());
        questionDTO.setOptions(question.getOptions());
        questionDTO.setDifficulty(String.valueOf(question.getDifficulty()));
        questionDTO.setTopic(String.valueOf(question.getTopic()));
        return questionDTO;
    }
}
