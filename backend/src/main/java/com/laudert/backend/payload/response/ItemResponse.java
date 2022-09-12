package com.laudert.backend.payload.response;

import java.util.UUID;

public class ItemResponse {

    private UUID id;

    private String name;

    private UserResponse user;

    public ItemResponse(UUID id, String name, UserResponse user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }
}
