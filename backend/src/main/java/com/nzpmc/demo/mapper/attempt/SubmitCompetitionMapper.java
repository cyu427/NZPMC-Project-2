package com.nzpmc.demo.mapper.attempt;

import com.nzpmc.demo.dto.attempt.SubmitCompetitionDTO;
import com.nzpmc.demo.models.Attempt;

public class SubmitCompetitionMapper {
    public Attempt convertToModel(SubmitCompetitionDTO submitCompetitionDTO) {
        Attempt attempt = new Attempt();
        attempt.setAttempts(submitCompetitionDTO.getAttempt());
        return attempt;
    }
}
