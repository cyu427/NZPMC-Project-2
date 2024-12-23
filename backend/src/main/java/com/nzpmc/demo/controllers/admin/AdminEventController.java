package com.nzpmc.demo.controllers.admin;

import com.nzpmc.demo.dto.event.EventDetailDTO;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.services.EventService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("admin/event")
@AllArgsConstructor
public class AdminEventController {
    private final EventService eventService;

    @PostMapping
    public ResponseEntity createEvent(@Valid @RequestBody EventDetailDTO eventDetailDTO) {
        try {
            eventService.createEvent(eventDetailDTO);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity updateEvent(@PathVariable String id, @Valid @RequestBody EventDetailDTO eventDetailDTO) {
        try {
            Event updatedEvent = eventService.editEvent(id, eventDetailDTO);
            return ResponseEntity.ok(updatedEvent);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event with id " + id + " not found.");
        }
    }
}
