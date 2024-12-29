package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.competition.CreateCompetitionDTO;
import com.nzpmc.demo.dto.competition.EditCompetitionDTO;
import com.nzpmc.demo.dto.event.EventDetailDTO;
import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.mapper.competition.CreateCompetitionMapper;
import com.nzpmc.demo.mapper.competition.EditCompetitionMapper;
import com.nzpmc.demo.mapper.event.EventDetailMapper;
import com.nzpmc.demo.mapper.question.QuestionMapper;
import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.repository.CompetitionRepository;
import com.nzpmc.demo.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class CompetitionService {
    private final CompetitionRepository competitionRepository;
    private final QuestionRepository questionRepository;

    public Competition createCompetition(CreateCompetitionDTO createCompetitionDTO) {
        Competition competition = new CreateCompetitionMapper().convertToModel(createCompetitionDTO);
        competitionRepository.save(competition);
        return competition;
    }

    public Competition addQuestionToCompetition(String competitionId, String questionId) {
        Competition competition = competitionRepository.findById(competitionId).orElseThrow(()-> new NoSuchElementException("Could not find competition with id"));
        Question question = questionRepository.findById(questionId).orElseThrow(()-> new NoSuchElementException("Could not find question with id"));


        // Initialize the list if it is null for the questions
        if (competition.getQuestions() == null) {
            competition.setQuestions(new ArrayList<>());
        }

        // Check for duplicates
        if (competition.getQuestions().contains(question)) {
            throw new IllegalArgumentException("Question with id " + questionId + " is already added to competition with id " + competitionId);
        }

        competition.getQuestions().add(question);
        competitionRepository.save(competition);
        return competition;
    }


    public Competition editCompetition(String id, EditCompetitionDTO editCompetitionDTO) {
        competitionRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find competition with id"));
        Competition competition = new EditCompetitionMapper().convertToModel(editCompetitionDTO);
        competition.setId(id);
        competitionRepository.save(competition);
        return competition;
    }
}
