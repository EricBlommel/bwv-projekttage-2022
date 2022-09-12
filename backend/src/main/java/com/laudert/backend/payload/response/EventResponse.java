package com.laudert.backend.payload.response;

import com.laudert.backend.domain.Item;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public class EventResponse {

    private UUID id;

    private String name;

    private Instant beginsAt;

    private String description;

    private UserResponse creator;

    private Set<UserResponse> users;

    private Set<ItemResponse> items;

    public EventResponse(UUID id, String name, Instant beginsAt, String description, UserResponse creator, Set<UserResponse> users, Set<ItemResponse> items) {
        this.id = id;
        this.name = name;
        this.beginsAt = beginsAt;
        this.description = description;
        this.creator = creator;
        this.users = users;
        this.items = items;
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

    public Instant getBeginsAt() {
        return beginsAt;
    }

    public void setBeginsAt(Instant beginsAt) {
        this.beginsAt = beginsAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserResponse getCreator() {
        return creator;
    }

    public void setCreator(UserResponse creator) {
        this.creator = creator;
    }

    public Set<UserResponse> getUsers() {
        return users;
    }

    public void setUsers(Set<UserResponse> users) {
        this.users = users;
    }

    public Set<ItemResponse> getItems() {
        return items;
    }

    public void setItems(Set<ItemResponse> items) {
        this.items = items;
    }
}
