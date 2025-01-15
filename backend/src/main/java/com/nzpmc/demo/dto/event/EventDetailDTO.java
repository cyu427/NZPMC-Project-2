package com.nzpmc.demo.dto.event;

import com.nzpmc.demo.models.Competition;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
public class EventDetailDTO {
    private String id;

    @NotNull(message = "Event name is required")
    private String name;

    @NotNull(message = "Date time is required")
    private Date dateTime;

    @NotNull(message = "Location is required")
    private String location;

    @NotNull(message = "Cost is required")
    private double cost;

    @NotNull(message = "Description is required")
    private String description;

    private Competition competition;
}
