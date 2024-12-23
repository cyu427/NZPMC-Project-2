package com.nzpmc.demo.controllers;

import com.nzpmc.demo.models.School;
import com.nzpmc.demo.services.SchoolService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("school")
public class SchoolController {

    @Autowired
    private SchoolService schoolService;

    @GetMapping
    public ResponseEntity getAllSchools() {
        List<School> allSchools = schoolService.getAllSchools();
        return ResponseEntity.ok(allSchools);
    }
}
