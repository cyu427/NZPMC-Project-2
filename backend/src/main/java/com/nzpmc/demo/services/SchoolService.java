package com.nzpmc.demo.services;

import com.nzpmc.demo.models.School;
import com.nzpmc.demo.repository.SchoolRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SchoolService {

    @Autowired
    private SchoolRepository schoolRepository;

    public List<School> getAllSchools() {
        return schoolRepository.findAll();
    }
}
