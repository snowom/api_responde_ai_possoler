package com.possoler.respondeai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingController {

    @GetMapping("/ping")
    private ResponseEntity<String> ping() {
        return ResponseEntity.ok().body("pong");
    }
}
