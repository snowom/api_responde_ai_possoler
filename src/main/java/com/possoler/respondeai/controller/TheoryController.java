package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.ExerciseRequestDTO;
import com.possoler.respondeai.service.TheoryService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class TheoryController {

    private final TheoryService theoryService;

    public TheoryController(TheoryService theoryService) {
        this.theoryService = theoryService;
    }

    @PostMapping("${respondeai-api.endpoint.getTheoryData}")
    private ResponseEntity<Object> getTheoryData(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody @Valid ExerciseRequestDTO payload
    ){
        Object response = theoryService.getTheoryData(payload.getItemId(), token);
        return ResponseEntity.ok().body(response);
    }
}
