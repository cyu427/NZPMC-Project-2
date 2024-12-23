package com.nzpmc.demo.repository;

import com.nzpmc.demo.models.School;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepository extends MongoRepository<School, String> {
}
