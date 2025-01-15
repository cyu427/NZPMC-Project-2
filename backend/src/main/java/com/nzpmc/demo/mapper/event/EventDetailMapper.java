package com.nzpmc.demo.mapper.event;

import com.nzpmc.demo.dto.event.EventDetailDTO;
import com.nzpmc.demo.dto.student.StudentProfileDTO;
import com.nzpmc.demo.models.Event;
import com.nzpmc.demo.models.Student;

public class EventDetailMapper {
    public Event convertToModel(Event event, EventDetailDTO eventDetailDTO) {
        event.setName(eventDetailDTO.getName());
        event.setDateTime(eventDetailDTO.getDateTime());
        event.setLocation(eventDetailDTO.getLocation());
        event.setCost(eventDetailDTO.getCost());
        event.setDescription(eventDetailDTO.getDescription());
        return event;
    }

    public EventDetailDTO convertToDTO(Event event) {
        EventDetailDTO eventDetailDTO = new EventDetailDTO();
        eventDetailDTO.setId(event.getId());
        eventDetailDTO.setName(event.getName());
        eventDetailDTO.setDateTime(event.getDateTime());
        eventDetailDTO.setLocation(event.getLocation());
        eventDetailDTO.setCost(event.getCost());
        eventDetailDTO.setDescription(event.getDescription());
        eventDetailDTO.setCompetition(event.getCompetition());
        return eventDetailDTO;
    }


}
