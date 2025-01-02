package com.nzpmc.demo.mapper.competition;

import com.nzpmc.demo.dto.competition.QuestionHelperDTO;
import com.nzpmc.demo.dto.competition.ViewCompetitionDTO;
import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.utils.QuestionHelperToQuestion;

import java.util.List;

public class ViewCompetitionMapper {
    public ViewCompetitionDTO convertToDTO(Competition competition) {
        ViewCompetitionDTO viewCompetitionDTO = new ViewCompetitionDTO();
        viewCompetitionDTO.setId(competition.getId());
        viewCompetitionDTO.setTitle(competition.getTitle());

        if (competition.getQuestions() != null) {
            QuestionHelperToQuestion questionHelper = new QuestionHelperToQuestion();
            List<QuestionHelperDTO> questions = questionHelper.convertToQuestionHelper(competition.getQuestions());
            viewCompetitionDTO.setQuestion(questions);
        }

        return viewCompetitionDTO;
    }
}
