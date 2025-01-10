package com.nzpmc.demo.dto.auth;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CredentialsDTO {

    @NotNull(message = "Email is required")
    private String email;

    @NotNull(message = "Password is required")
    private String password;
}
