package com.nzpmc.demo.mapper.auth;

import com.nzpmc.demo.dto.auth.UserLoginDTO;
import com.nzpmc.demo.models.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserLoginMapper {

    @Mapping(source = "id", target = "userId")
    UserLoginDTO toUserLoginDTO(Account account);
}
