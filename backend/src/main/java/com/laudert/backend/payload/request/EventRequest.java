package com.laudert.backend.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.UUID;

public class EventRequest {

    @NotBlank
    private String name;

    @NotBlank
    private Instant beginsAt;

    @Size(max = 1000)
    private String description;

    @NotBlank
    private UUID creatorId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDate() {
        return beginsAt;
    }

    public void setDate(Instant date) {
        this.beginsAt = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UUID getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(UUID creatorId) {
        this.creatorId = creatorId;
    }
}
