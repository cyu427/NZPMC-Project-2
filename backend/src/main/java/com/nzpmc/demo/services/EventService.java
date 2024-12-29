package com.nzpmc.demo.services;

import com.nzpmc.demo.dto.event.EventDetailDTO;
import com.nzpmc.demo.mapper.event.EventDetailMapper;
import com.nzpmc.demo.models.*;
import com.nzpmc.demo.repository.AccountRepository;
import com.nzpmc.demo.repository.CompetitionRepository;
import com.nzpmc.demo.repository.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class EventService {
    //private final StudentRepository studentRepository;
    private final EventRepository eventRepository;
    private final AccountRepository accountRepository;

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
        Account account = accountRepository.findById(studentId).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));
        //Student student = studentRepository.findById(studentId).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));

        // Initialize the list if it is null
        if (event.getParticipatingStudents() == null) {
            event.setParticipatingStudents(new ArrayList<>());
        }

        // Check if the student is already participating in the event
        if (event.getParticipatingStudents().contains(account)) {
            throw new IllegalStateException("Student is already participating in the event.");
        }

        Student studentDetails = account.getStudent();

        // Initialize the list if it is null for the student
        if (studentDetails.getEventsParticipated() == null) {
            studentDetails.setEventsParticipated(new ArrayList<>());
        }

        // Add the event to the student's participated events
        studentDetails.getEventsParticipated().add(event);
        account.setStudent(studentDetails);

        // Add the student to the event's participating students
        event.getParticipatingStudents().add(account);

        // Save the updated event and student objects to the database
        eventRepository.save(event);
        accountRepository.save(account);


//        // Initialize the list if it is null for the student
//        if (account.getStudent().getEventsParticipated() == null) {
//            student.setEventsParticipated(new ArrayList<>());
//        }

//        // Add the student to the event's participating students
//        event.getParticipatingStudents().add(student);
//
//        // Add the event to the student's participated events
//        student.getEventsParticipated().add(event);
//
//        // Save the updated event and student objects to the database
//        eventRepository.save(event);
//        studentRepository.save(student);
    }

    public List<EventDetailDTO> getAllEventsStudentJoined(String studentId) {
//        Student student = studentRepository.findById(studentId).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));
//
//        // Get the list of events the student has participated in
//        List<Event> eventsParticipated = Optional.ofNullable(student.getEventsParticipated())
//                .orElse(Collections.emptyList());
//
//        // Convert the events to EventDetailDTO using the mapper
//        EventDetailMapper mapper = new EventDetailMapper();
//        return eventsParticipated.stream()
//                .map(mapper::convertToDTO)
//                .toList();

        Account account = accountRepository.findById(studentId).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));

        // Get the list of events the student has participated in
        List<Event> eventsParticipated = Optional.ofNullable(account.getStudent().getEventsParticipated())
                .orElse(Collections.emptyList());

        // Convert the events to EventDetailDTO using the mapper
        EventDetailMapper mapper = new EventDetailMapper();
        return eventsParticipated.stream()
                .map(mapper::convertToDTO)
                .toList();
    }

    public List<EventDetailDTO> getAllEventsStudentNotJoined(String studentId) {
//        Student student = studentRepository.findById(studentId).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));
//
//        // Retrieve all events from the repository
//        List<Event> allEvents = eventRepository.findAll();
//
//        List<Event> joinedEvents = Optional.ofNullable(student.getEventsParticipated())
//                .orElse(Collections.emptyList());
//
//        // Filter out the events the student has already joined
//        List<Event> notJoinedEvents = allEvents.stream()
//                .filter(event -> !joinedEvents.contains(event))
//                .toList();
//
//        EventDetailMapper mapper = new EventDetailMapper();
//        return notJoinedEvents.stream()
//                .map(mapper::convertToDTO)
//                .toList();

        Account account = accountRepository.findById(studentId).orElseThrow(()-> new NoSuchElementException("Could not find student with id"));

        // Retrieve all events from the repository
        List<Event> allEvents = eventRepository.findAll();

        List<Event> joinedEvents = Optional.ofNullable(account.getStudent().getEventsParticipated())
                .orElse(Collections.emptyList());

        // Filter out the events the student has already joined
        List<Event> notJoinedEvents = allEvents.stream()
                .filter(event -> !joinedEvents.contains(event))
                .toList();

        EventDetailMapper mapper = new EventDetailMapper();
        return notJoinedEvents.stream()
                .map(mapper::convertToDTO)
                .toList();

    }

}
