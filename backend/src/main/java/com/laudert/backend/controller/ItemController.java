package com.laudert.backend.controller;

import com.laudert.backend.domain.Item;
import com.laudert.backend.domain.User;
import com.laudert.backend.payload.response.ItemResponse;
import com.laudert.backend.repository.ItemRepository;
import com.laudert.backend.repository.UserRepository;
import com.laudert.backend.util.ConvertUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(path = "api/item")
public class ItemController {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public ItemController(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UUID> deleteItem(@PathVariable UUID id){
        try {
            itemRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/update/add/user/{id}")
    public ResponseEntity<ItemResponse> updateItem(@PathVariable UUID id, @RequestBody UUID userId){
        try {
            if (itemRepository.findById(id).isPresent()) {
                Item item = itemRepository.findById(id).get();
                User user = null;
                if (userRepository.findById(userId).isPresent()) {
                    item.setUser(userRepository.findById(userId).get());
                } else {
                    item.setUser(new User());
                }
                return new ResponseEntity<>(ConvertUtils.convertItemToItemResponse(itemRepository.save(item)), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/update/remove/user/{id}")
    public ResponseEntity<ItemResponse> updateItem(@PathVariable UUID id){
        try {
            if (itemRepository.findById(id).isPresent()) {
                Item item = itemRepository.findById(id).get();
                item.setUser(null);
                return new ResponseEntity<>(ConvertUtils.convertItemToItemResponse(itemRepository.save(item)), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
