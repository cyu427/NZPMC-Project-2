package com.nzpmc.demo.repository;

import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionRepository extends MongoRepository<Competition, String> {
}
