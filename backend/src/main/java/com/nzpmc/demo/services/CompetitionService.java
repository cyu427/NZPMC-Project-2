package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.competition.CreateCompetitionDTO;
import com.nzpmc.demo.dto.competition.EditCompetitionDTO;
import com.nzpmc.demo.dto.competition.ViewCompetitionDTO;
import com.nzpmc.demo.mapper.competition.CreateCompetitionMapper;
import com.nzpmc.demo.mapper.competition.EditCompetitionMapper;
import com.nzpmc.demo.mapper.competition.ViewCompetitionMapper;
import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.projection.ViewAllCompetitionProjection;
import com.nzpmc.demo.repository.CompetitionRepository;
import com.nzpmc.demo.repository.EventRepository;
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
    private final EventRepository eventRepository;

    public Competition createCompetition(CreateCompetitionDTO createCompetitionDTO) {
        Competition competition = new CreateCompetitionMapper().convertToModel(createCompetitionDTO);
        competitionRepository.save(competition);
        return competition;
    }

    public void addQuestionToCompetition(String competitionId, String questionId) {
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
    }

    public ViewCompetitionDTO getCompetition(String competitionId) {
        Competition competition = competitionRepository.findById(competitionId).orElseThrow(()-> new NoSuchElementException("Could not find competition with id"));
        return new ViewCompetitionMapper().convertToDTO(competition);
    }

    public List<ViewAllCompetitionProjection> getAllCompetitions() {
        return competitionRepository.findAllBy();
    }

    public void addCompetitionToEvent(String competitionId, String eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(()-> new NoSuchElementException("Could not find event with id"));

        if (event.getCompetition() != null) {
            throw new IllegalStateException("Competition with id" + competitionId + " is already associated with an event with id" + event.getCompetition().getId());
        }

        Competition competition = competitionRepository.findById(competitionId).orElseThrow(()-> new NoSuchElementException("Could not find competition with id"));

        event.setCompetition(competition);
        eventRepository.save(event);
    }



    public Competition editCompetition(String id, EditCompetitionDTO editCompetitionDTO) {
        competitionRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find competition with id"));
        Competition competition = new EditCompetitionMapper().convertToModel(editCompetitionDTO);
        competition.setId(id);
        competitionRepository.save(competition);
        return competition;
    }
}
