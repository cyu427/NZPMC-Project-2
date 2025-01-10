package com.nzpmc.demo.repository;

import com.nzpmc.demo.models.Account;
import com.nzpmc.demo.models.Role;
import com.nzpmc.demo.models.Student;
import com.nzpmc.demo.projection.AccountProjection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
    Optional<Account> findByUsername(String email);
    List<AccountProjection> findByRole(Role role);
}
