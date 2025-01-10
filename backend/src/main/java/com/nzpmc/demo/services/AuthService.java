package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.auth.CredentialsDTO;
import com.nzpmc.demo.dto.auth.UserLoginDTO;
import com.nzpmc.demo.mapper.auth.UserLoginMapper;
import com.nzpmc.demo.models.Account;
import com.nzpmc.demo.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountRepository accountRepository;
    private final UserLoginMapper userLoginMapper;

    public UserLoginDTO login(CredentialsDTO credentialsDto) {
        Account account = accountRepository.findByUsername(credentialsDto.getEmail())
                .orElseThrow(() -> new NoSuchElementException("Could not find student with id"));

        if (!account.getPassword().equals(credentialsDto.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password.");
        }

        return userLoginMapper.toUserLoginDTO(account);
    }
}
