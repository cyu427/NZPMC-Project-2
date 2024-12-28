package com.nzpmc.demo.dto.competition;

import lombok.Data;

import java.util.List;

@Data
public class ViewCompetitionDTO {
    private String id;
    private String title;
    private List<QuestionHelperDTO> question;
}
