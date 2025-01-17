package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.mapper.question.QuestionMapper;
import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.repository.CompetitionRepository;
import com.nzpmc.demo.repository.QuestionRepository;
import com.nzpmc.demo.projection.ViewAllQuestionProjection;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final CompetitionRepository competitionRepository;

    public Question createQuestion(QuestionDTO questionDTO) {
        Question question = new QuestionMapper().convertToModel(questionDTO);
        questionRepository.save(question);
        return question;
    }

    public Question editQuestion(String id, QuestionDTO questionDTO) {
        questionRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find question with id"));
        Question question = new QuestionMapper().convertToModel(questionDTO);
        question.setId(id);
        questionRepository.save(question);
        return question;
    }

    public List<ViewAllQuestionProjection> getAllQuestionOverview() {
        return questionRepository.findAllBy();
    }

    public QuestionDTO getQuestionById(String id) {
        Question question = questionRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find question with id"));
        return new QuestionMapper().convertToDTO(question);
    }

    public void deleteQuestion(String id) {
        Question question = questionRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Could not find question with id " + id));

        // Find all competitions associated with this question
        List<Competition> competitions = competitionRepository.findAll(); // Retrieve all competitions

        // Iterate through each competition to remove the question
        for (Competition competition : competitions) {
            // Check if the competition has this question
            if (competition.getQuestions().contains(question)) {
                competition.getQuestions().remove(question); // Remove the question from the competition
                competitionRepository.save(competition); // Save the updated competition
            }
        }

        questionRepository.deleteById(id);

        // Delete the question
        questionRepository.deleteById(id);
    }


}
