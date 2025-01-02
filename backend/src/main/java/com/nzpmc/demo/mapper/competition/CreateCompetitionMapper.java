package com.nzpmc.demo.mapper.competition;

import com.nzpmc.demo.dto.competition.CreateCompetitionDTO;
import com.nzpmc.demo.models.Competition;

public class CreateCompetitionMapper {
    public Competition convertToModel(CreateCompetitionDTO dto) {
        Competition competition = new Competition();
        competition.setTitle(dto.getTitle());
        return competition;
    }
}
