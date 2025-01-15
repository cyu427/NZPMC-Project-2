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

    public void removeCompetitionFromEvent(String competitionId, String eventId) {
        // Retrieve the event by ID or throw an exception if it doesn't exist
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new NoSuchElementException("Could not find event with id " + eventId));

        // Check if the event has an associated competition
        if (event.getCompetition() == null || !event.getCompetition().getId().equals(competitionId)) {
            throw new IllegalStateException("Competition with id " + competitionId + " is not associated with event with id " + eventId);
        }

        // Remove the association
        event.setCompetition(null);

        // Save the updated event to the repository
        eventRepository.save(event);

    }

    public Competition editCompetition(String id, EditCompetitionDTO editCompetitionDTO) {
        competitionRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find competition with id"));
        Competition competition = new EditCompetitionMapper().convertToModel(editCompetitionDTO);
        competition.setId(id);
        competitionRepository.save(competition);
        return competition;
    }

    public void removeQuestionFromCompetition(String competitionId, String questionId) {
        // Retrieve the competition by ID or throw an exception if it doesn't exist
        Competition competition = competitionRepository.findById(competitionId).orElseThrow(() -> new NoSuchElementException("Could not find competition with id " + questionId));

        // Retrieve the question by ID or throw an exception if it doesn't exist
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new NoSuchElementException("Could not find question with id " + questionId));

        // Check if the competition has a list of questions
        if (competition.getQuestions() == null || !competition.getQuestions().contains(question)) {
            throw new IllegalArgumentException("Question with id " + questionId + " is not associated with competition with id " + competitionId);
        }

        // Remove the question from the competition's list of questions
        competition.getQuestions().remove(question);

        // Save the updated competition to the repository
        competitionRepository.save(competition);
    }
}
