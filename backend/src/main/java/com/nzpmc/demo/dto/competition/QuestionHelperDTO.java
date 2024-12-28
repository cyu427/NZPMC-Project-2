package com.nzpmc.demo.dto.competition;

import com.nzpmc.demo.models.Option;
import lombok.Data;

import java.util.List;

@Data
public class QuestionHelperDTO {
    private String id;
    private String title;
    List<Option> options;
}
