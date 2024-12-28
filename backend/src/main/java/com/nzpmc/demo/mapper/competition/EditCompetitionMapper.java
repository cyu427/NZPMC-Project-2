package com.nzpmc.demo.mapper.competition;

import com.nzpmc.demo.dto.competition.EditCompetitionDTO;
import com.nzpmc.demo.dto.competition.QuestionHelperDTO;
import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.utils.QuestionHelperToQuestion;

import java.util.List;

public class EditCompetitionMapper {
    public Competition convertToModel(EditCompetitionDTO editCompetitionDTO) {
        Competition competition = new Competition();
        competition.setTitle(editCompetitionDTO.getTitle());

        List<QuestionHelperDTO> questionHelperDTO = editCompetitionDTO.getQuestion();
        QuestionHelperToQuestion questionHelperToQuestion = new QuestionHelperToQuestion();
        List<Question> questions = questionHelperToQuestion.convertToQuestion(questionHelperDTO);
        competition.setQuestions(questions);

        return competition;
    }
}
