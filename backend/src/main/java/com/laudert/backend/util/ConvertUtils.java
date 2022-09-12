package com.laudert.backend.util;

import com.laudert.backend.domain.Event;
import com.laudert.backend.domain.Item;
import com.laudert.backend.domain.User;
import com.laudert.backend.payload.response.EventResponse;
import com.laudert.backend.payload.response.ItemResponse;
import com.laudert.backend.payload.response.UserResponse;

import java.util.Objects;
import java.util.stream.Collectors;

public final class ConvertUtils {

    public static EventResponse convertEventToEventResponse(Event event) {
        return new EventResponse(
            event.getId(),
            event.getName(),
            event.getBeginsAt(),
            event.getDescription(),
            Objects.nonNull(event.getCreator()) ? convertUserToUserResponse(event.getCreator()) : null,
            Objects.nonNull(event.getUsers()) ? event.getUsers().stream().map(ConvertUtils::convertUserToUserResponse).collect(Collectors.toSet()) : null,
            Objects.nonNull(event.getItems()) ? event.getItems().stream().map(ConvertUtils::convertItemToItemResponse).collect(Collectors.toSet()) : null
        );
    }

    public static ItemResponse convertItemToItemResponse(Item item) {
        return new ItemResponse(item.getId(), item.getName(), Objects.nonNull(item.getUser()) ? convertUserToUserResponse(item.getUser()) : null);
    }

    public static UserResponse convertUserToUserResponse(User user) {
        return new UserResponse(user.getId(), user.getUsername());
    }

}
