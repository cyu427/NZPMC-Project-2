package com.nzpmc.demo.repository;

import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByCompetition(Competition competition);
}
