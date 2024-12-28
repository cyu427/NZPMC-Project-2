package com.nzpmc.demo.repository;

import com.nzpmc.demo.models.Attempt;
import com.nzpmc.demo.models.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttemptRepository extends MongoRepository<Attempt, String> {
}
