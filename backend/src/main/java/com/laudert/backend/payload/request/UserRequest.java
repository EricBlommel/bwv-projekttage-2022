package com.laudert.backend.payload.request;

import java.util.UUID;

public class UserRequest {

    private UUID id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
