package com.nzpmc.demo.dto.auth;

import com.nzpmc.demo.models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {
    private String userId;
    private Role role;
    private String token;
}
