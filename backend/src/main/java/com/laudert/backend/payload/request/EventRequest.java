package com.laudert.backend.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.Instant;

public class EventRequest {

    @NotBlank
    private String name;

    @NotBlank
    private Instant date;

    @Size(max = 1000)
    private String description;
}
