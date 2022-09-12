package com.laudert.backend.controller;

import com.laudert.backend.domain.Event;
import com.laudert.backend.domain.Item;
import com.laudert.backend.domain.User;
import com.laudert.backend.payload.request.EventRequest;
import com.laudert.backend.payload.request.ItemRequest;
import com.laudert.backend.payload.request.UserRequest;
import com.laudert.backend.payload.response.EventResponse;
import com.laudert.backend.repository.EventRepository;
import com.laudert.backend.repository.ItemRepository;
import com.laudert.backend.repository.UserRepository;
import com.laudert.backend.util.ConvertUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping(path = "api/event")
public class EventController {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public EventController(EventRepository eventRepository, UserRepository userRepository, ItemRepository itemRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    @GetMapping("")
    @Secured("ROLE_USER")
    public List<EventResponse> getEvents() {

        return eventRepository.findAll().stream()
                              .map(ConvertUtils::convertEventToEventResponse).collect(Collectors.toList());
    }

    @GetMapping("/get/{id}")
    public EventResponse getevent(@PathVariable UUID id) {
        if (eventRepository.findById(id).isPresent()) {
            Event event = eventRepository.findById(id).get();
            return ConvertUtils.convertEventToEventResponse(event);
        }
        return null;
    }

    @PostMapping("/create")
    @Secured("ROLE_USER")
    public ResponseEntity<EventResponse> createEvent(@RequestBody EventRequest eventRequest) {

        Event event = new Event(eventRequest.getName(), eventRequest.getDate(), eventRequest.getDescription());

        try {
            User creator = userRepository.findById(eventRequest.getCreatorId())
                                         .orElseThrow(() -> new RuntimeException("Error: User is not found."));
            event.setCreator(creator);
            event.setUsers(Set.of(creator));
            return new ResponseEntity<>(ConvertUtils.convertEventToEventResponse(eventRepository.save(event)), HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add/item/{id}")
    public ResponseEntity<EventResponse> addItemToEvent(@PathVariable UUID id, @Valid @RequestBody ItemRequest itemRequest) {
        try {
            if (eventRepository.findById(id).isPresent()) {
                Event event = eventRepository.findById(id).get();
                Item item;
                if (Objects.nonNull(itemRequest.getUserId()) && userRepository.findById(itemRequest.getUserId()).isPresent()) {
                    item = itemRepository.save(new Item(itemRequest.getName(), event, userRepository.findById(itemRequest.getUserId()).get()));
                }
                else {
                    item = itemRepository.save(new Item(itemRequest.getName(), event, null));
                }
                event.getItems().add(item);
                return new ResponseEntity<>(ConvertUtils.convertEventToEventResponse(eventRepository.save(event)), HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add/user/{id}")
    public ResponseEntity<EventResponse> addUserToEvent(@PathVariable UUID id, @Valid @RequestBody UserRequest userRequest) {
        try {
            if (eventRepository.findById(id).isPresent()) {
                Event event = eventRepository.findById(id).get();
                User user;
                if (userRepository.findById(userRequest.getId()).isPresent()) {
                    user = userRepository.findById(userRequest.getId()).get();
                    event.getUsers().add(user);
                    return new ResponseEntity<>(ConvertUtils.convertEventToEventResponse(eventRepository.save(event)), HttpStatus.CREATED);
                }
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
