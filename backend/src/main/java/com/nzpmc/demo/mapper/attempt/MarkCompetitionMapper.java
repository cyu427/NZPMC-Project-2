package com.nzpmc.demo.mapper.attempt;

import com.nzpmc.demo.dto.attempt.MarkCompetitionDTO;
import com.nzpmc.demo.dto.attempt.ResultDTO;
import com.nzpmc.demo.models.Attempt;

import java.util.List;

public class MarkCompetitionMapper {
    public MarkCompetitionDTO convertToDTO(List<ResultDTO> results) {
        MarkCompetitionDTO markCompetitionDTO = new MarkCompetitionDTO();
        markCompetitionDTO.setResults(results);
        return markCompetitionDTO;
    }
}
