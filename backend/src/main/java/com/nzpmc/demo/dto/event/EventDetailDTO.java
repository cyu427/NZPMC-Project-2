package com.nzpmc.demo.dto.event;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
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
}
