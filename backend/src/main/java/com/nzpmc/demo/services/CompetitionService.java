package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.competition.CreateCompetitionDTO;
import com.nzpmc.demo.dto.question.QuestionDTO;
import com.nzpmc.demo.mapper.competition.CreateCompetitionMapper;
import com.nzpmc.demo.mapper.question.QuestionMapper;
import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.repository.CompetitionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CompetitionService {
    private final CompetitionRepository competitionRepository;

    public Competition createCompetition(CreateCompetitionDTO createCompetitionDTO) {
        Competition competition = new CreateCompetitionMapper().convertToModel(createCompetitionDTO);
        competitionRepository.save(competition);
        return competition;
    }
}
