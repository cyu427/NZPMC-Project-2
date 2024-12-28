package com.nzpmc.demo.dto.competition;

import lombok.Data;

import java.util.List;

@Data
public class EditCompetitionDTO {
    private String title;
    private List<QuestionHelperDTO> question;
}
