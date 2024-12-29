package com.nzpmc.demo.repository;

import com.nzpmc.demo.models.Competition;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.projection.ViewAllCompetitionProjection;
import com.nzpmc.demo.projection.ViewAllQuestionProjection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetitionRepository extends MongoRepository<Competition, String> {
    List<ViewAllCompetitionProjection> findAllBy();
}
