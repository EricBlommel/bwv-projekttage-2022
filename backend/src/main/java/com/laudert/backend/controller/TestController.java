package com.laudert.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/test")
public class TestController {

    @GetMapping("")
    public String test() {
        return "Dies ist ein Test";
    }
}
