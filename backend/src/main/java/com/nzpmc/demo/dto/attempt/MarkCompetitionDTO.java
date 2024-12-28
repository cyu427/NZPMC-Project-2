package com.nzpmc.demo.dto.attempt;

import lombok.Data;

import java.util.List;

@Data
public class MarkCompetitionDTO {
    private List<ResultDTO> results;
}
