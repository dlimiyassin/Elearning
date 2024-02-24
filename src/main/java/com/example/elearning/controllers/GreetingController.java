package com.example.elearning.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api")
public class GreetingController {
    @GetMapping()
    public String greeting(){
        return "welcome my friend!";
    }
}
