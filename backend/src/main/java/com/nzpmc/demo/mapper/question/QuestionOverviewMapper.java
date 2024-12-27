package com.nzpmc.demo.mapper.question;

import com.nzpmc.demo.dto.question.QuestionOverviewDTO;
import com.nzpmc.demo.models.Question;

public class QuestionOverviewMapper {
    public QuestionOverviewDTO convertToDTO(Question question) {
        QuestionOverviewDTO questionOverviewDTO = new QuestionOverviewDTO();
        questionOverviewDTO.setId(question.getId());
        questionOverviewDTO.setTitle(question.getTitle());
        return questionOverviewDTO;
    }
}
