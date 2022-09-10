package com.laudert.backend.controller;

import com.laudert.backend.domain.Item;
import com.laudert.backend.repository.ItemRepository;
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
@RequestMapping(path = "api/item")
public class ItemController {

    private final ItemRepository itemRepository;

    public ItemController(ItemRepository eventRepository) {
        this.itemRepository = eventRepository;
    }

    @GetMapping("")
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Item getevent(@PathVariable UUID id) {
        if(itemRepository.findById(id).isPresent()) {
            return itemRepository.findById(id).get();
        }
        return null;
    }

    @PostMapping("/create")
    public ResponseEntity<Item> createEvent(@RequestBody Item item){
        try {
            return new ResponseEntity<>(itemRepository.save(item), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
