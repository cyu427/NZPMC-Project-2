package com.nzpmc.demo.controllers;

import com.nzpmc.demo.dto.event.EventDetailDTO;
import com.nzpmc.demo.dto.student.StudentProfileDTO;
import com.nzpmc.demo.dto.student.StudentRegistrationDTO;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.models.Student;
import com.nzpmc.demo.services.EventService;
import com.nzpmc.demo.services.StudentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("event")
@AllArgsConstructor
public class EventController {
    private final EventService eventService;

    @PutMapping("{studentId}/join/{eventId}")
    public ResponseEntity joinEvent(@PathVariable String eventId, @PathVariable String studentId) {
        try {
            eventService.joinEvent(studentId, eventId);
            return ResponseEntity.ok("Student with id " + studentId + " successfully joined event with id " + eventId);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity getAllEvents() {
        try {
            List<EventDetailDTO> allEvents = eventService.getAllEvents();
            return ResponseEntity.ok(allEvents);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("{studentId}/joined")
    public ResponseEntity getAllEventStudentJoined(@PathVariable String studentId) {
        try {
            List<EventDetailDTO> eventsStudentJoined = eventService.getAllEventsStudentJoined(studentId);
            return ResponseEntity.ok(eventsStudentJoined);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("{studentId}/not-joined")
    public ResponseEntity getAllEventStudentNotJoined(@PathVariable String studentId) {
        try {
            List<EventDetailDTO> eventsStudentNotJoined = eventService.getAllEventsStudentNotJoined(studentId);
            return ResponseEntity.ok(eventsStudentNotJoined);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("{eventId}")
    public ResponseEntity getEvent(@PathVariable String eventId) {
        try {
            EventDetailDTO event = eventService.getEvent(eventId);
            return ResponseEntity.ok(event);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
