package com.laudert.backend.controller;

import com.laudert.backend.domain.Event;
import com.laudert.backend.repository.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(path = "api/event")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping("")
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Event getevent(@PathVariable UUID id) {
        if(eventRepository.findById(id).isPresent()) {
            return eventRepository.findById(id).get();
        }
        return null;
    }

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(@RequestBody Event event){
        try {
            return new ResponseEntity<>(eventRepository.save(event), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
