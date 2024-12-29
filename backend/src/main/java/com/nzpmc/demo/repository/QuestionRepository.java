package com.nzpmc.demo.repository;

import com.nzpmc.demo.models.Question;
import com.nzpmc.demo.projection.ViewAllQuestionProjection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<ViewAllQuestionProjection> findAllBy();
}
