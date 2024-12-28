package com.nzpmc.demo.dto.attempt;

import com.nzpmc.demo.models.Option;
import lombok.Data;

import java.util.Map;

@Data
public class SubmitCompetitionDTO {
    private Map<String, Option> attempt;
}
