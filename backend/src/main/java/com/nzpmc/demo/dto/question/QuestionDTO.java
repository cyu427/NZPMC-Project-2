package com.nzpmc.demo.dto.question;

import com.nzpmc.demo.models.Option;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class QuestionDTO {
    @NotNull(message = "Question name is required")
    private String question;

    @NotNull(message = "Options are required")
    @Size(min = 4, max = 4, message = "There must be exactly 4 options")
    @Valid
    private List<Option> options;
}
