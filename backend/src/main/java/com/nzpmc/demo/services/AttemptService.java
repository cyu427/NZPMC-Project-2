package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.event.EventDetailDTO;
import com.nzpmc.demo.mapper.event.EventDetailMapper;
import com.nzpmc.demo.models.*;
import com.nzpmc.demo.repository.AccountRepository;
import com.nzpmc.demo.repository.AttemptRepository;
import com.nzpmc.demo.repository.CompetitionRepository;
import com.nzpmc.demo.repository.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class AttemptService {
    private final AttemptRepository attemptRepository;
    private final AccountRepository accountRepository;
    private final CompetitionRepository competitionRepository;

    public void submitAttempt(String accountId, String competitionId, Map<String, Option> attempts) {
        if (attempts == null || attempts.isEmpty()) {
            System.out.println("User submitted an empty attempt.");
            return;
        }

        Account account = accountRepository.findById(accountId).orElseThrow(()-> new NoSuchElementException("Could not find account with id"));
        Competition competition = competitionRepository.findById(competitionId).orElseThrow(()-> new NoSuchElementException("Could not find competition with id"));

        Attempt attempt = new Attempt();
        attempt.setAccount(account);
        attempt.setCompetition(competition);
        attempt.setAttempts(attempts);

        attemptRepository.save(attempt);
    }
}
