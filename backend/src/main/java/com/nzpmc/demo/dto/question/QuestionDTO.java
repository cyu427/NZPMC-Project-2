package com.nzpmc.demo.dto.question;

import com.nzpmc.demo.models.Option;
import lombok.Data;

import java.util.List;

@Data
public class QuestionDTO {
    private String question;
    private List<Option> options;
}
