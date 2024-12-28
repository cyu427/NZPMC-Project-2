package com.nzpmc.demo.models;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class Option {
    @NotNull(message = "Option must have answer")
    private String text;

    @NotNull(message = "Option must be either true or false. It cannot be null")
    private Boolean isCorrect;
}
