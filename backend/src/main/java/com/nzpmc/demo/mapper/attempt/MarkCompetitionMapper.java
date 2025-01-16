package com.nzpmc.demo.mapper.attempt;

import com.nzpmc.demo.dto.attempt.MarkCompetitionDTO;
import com.nzpmc.demo.dto.attempt.ResultDTO;
import com.nzpmc.demo.models.Account;
import com.nzpmc.demo.models.Attempt;
import com.nzpmc.demo.models.Option;
import com.nzpmc.demo.models.Student;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class MarkCompetitionMapper {
    public MarkCompetitionDTO convertToDTO(List<Attempt> attempts) {
        MarkCompetitionDTO markCompetitionDTO = new MarkCompetitionDTO();
        List<ResultDTO> results = new ArrayList<>();
        for (Attempt attempt : attempts) {
            ResultDTO result = new ResultDTO();
            Account account = attempt.getAccount();
            Student student = account.getStudent();

            result.setId(account.getId());
            result.setEmail(account.getUsername());
            result.setLastName(student.getLastName());
            result.setFirstName(student.getFirstName());
            result.setSchool(student.getSchool());

            int totalCorrectAnswer = getTotalCorrectAnswer(attempt.getAttempts());
            result.setGrade(totalCorrectAnswer);

            results.add(result);
        }

        markCompetitionDTO.setResults(results);
        return markCompetitionDTO;
    }

    private int getTotalCorrectAnswer(Map<String, Option> attempts) {
        return (int) attempts.values().stream()
                .filter(Option::getIsCorrect)
                .count();
    }
}
