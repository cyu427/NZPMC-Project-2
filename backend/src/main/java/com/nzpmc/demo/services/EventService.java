package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.event.EventDetailDTO;
import com.nzpmc.demo.mapper.event.EventDetailMapper;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.models.Student;
import com.nzpmc.demo.repository.EventRepository;
import com.nzpmc.demo.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class EventService {
    private final StudentRepository studentRepository;
    private final EventRepository eventRepository;

    public void createEvent(EventDetailDTO eventDetailDTO) {
        Event event = new Event();
        event = new EventDetailMapper().convertToModel(event, eventDetailDTO);
        eventRepository.save(event);
    }

    public Event editEvent(String id, EventDetailDTO eventDetailDTO) {
        Event event = eventRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Could not find event with id"));
        event = new EventDetailMapper().convertToModel(event, eventDetailDTO);
        eventRepository.save(event);
        return event;
    }

    public List<EventDetailDTO> getAllEvents() {
        List<Event> allEvents = eventRepository.findAll();
        EventDetailMapper mapper = new EventDetailMapper();
        return allEvents.stream()
                .map(mapper::convertToDTO)
                .toList();
    }

    public void joinEvent(String studentId, String eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(()-> new NoSuchElementException("Could not find event with id"));
        Student student = studentRepository.findById(studentId).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));

        // Check if the student is already participating in the event
        if (event.getParticipatingStudents().contains(student)) {
            throw new IllegalStateException("Student is already participating in the event.");
        }

        // Add the student to the event's participating students
        event.getParticipatingStudents().add(student);

        // Add the event to the student's participated events
        student.getEventsParticipated().add(event);

        // Save the updated event and student objects to the database
        eventRepository.save(event);
        studentRepository.save(student);
    }

    public List<EventDetailDTO> getAllEventsStudentJoined(String studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));

        // Get the list of events the student has participated in
        List<Event> eventsParticipated = student.getEventsParticipated();

        // Convert the events to EventDetailDTO using the mapper
        EventDetailMapper mapper = new EventDetailMapper();
        return eventsParticipated.stream()
                .map(mapper::convertToDTO)
                .toList();
    }

    public List<EventDetailDTO> getAllEventsStudentNotJoined(String studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));

        // Retrieve all events from the repository
        List<Event> allEvents = eventRepository.findAll();

        // Retrieve the events the student has already participated in
        List<Event> joinedEvents = student.getEventsParticipated();

        // Filter out the events the student has already joined
        List<Event> notJoinedEvents = allEvents.stream()
                .filter(event -> !joinedEvents.contains(event))
                .toList();

        // Convert the events the student hasn't joined to EventDetailDTO
        EventDetailMapper mapper = new EventDetailMapper();
        return notJoinedEvents.stream()
                .map(mapper::convertToDTO)
                .toList();
    }

}
