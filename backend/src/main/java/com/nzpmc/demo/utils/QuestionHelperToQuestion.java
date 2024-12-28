package com.nzpmc.demo.utils;

import com.nzpmc.demo.dto.competition.QuestionHelperDTO;
import com.nzpmc.demo.models.Question;

import java.util.List;

public class QuestionHelperToQuestion {
    public List<Question> convertToQuestion(List<QuestionHelperDTO> questionHelperDTO) {

        return questionHelperDTO.stream()
                .map(helper -> {
                    Question q = new Question();

                    q.setId(helper.getId());
                    q.setTitle(helper.getTitle());
                    q.setOptions(helper.getOptions());
                    return q;
                })
                .toList();
    }

    public List<QuestionHelperDTO> convertToQuestionHelper(List<Question> questions) {
        return questions.stream()
                .map(question -> {
                    QuestionHelperDTO qh = new QuestionHelperDTO();
                    qh.setId(question.getId());
                    qh.setTitle(question.getTitle());
                    qh.setOptions(question.getOptions());
                    return qh;
                })
                .toList();
    }
}
