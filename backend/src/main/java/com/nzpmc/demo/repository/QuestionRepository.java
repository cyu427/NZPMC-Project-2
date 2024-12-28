package com.nzpmc.demo.repository;

import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.models.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
}
