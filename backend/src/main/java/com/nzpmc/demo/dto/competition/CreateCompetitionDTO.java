package com.nzpmc.demo.dto.competition;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CreateCompetitionDTO {
    @NotNull(message = "Competition name is required")
    private String title;
}
