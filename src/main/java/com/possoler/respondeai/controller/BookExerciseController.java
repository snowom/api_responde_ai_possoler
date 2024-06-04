package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.ExerciseRequestDTO;
import com.possoler.respondeai.service.BookExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class BookExerciseController {

    private final BookExerciseService bookExerciseService;

    public BookExerciseController(BookExerciseService bookExerciseService) {
        this.bookExerciseService = bookExerciseService;
    }

    @PostMapping("${respondeai-api.endpoint.getBookExerciseData}")
    private ResponseEntity<Object> getExerciseData(
        @RequestHeader(name = "Authorization") String token,
        @RequestBody @Valid ExerciseRequestDTO payload
    ){
        Object response = bookExerciseService.getBookExerciseData(payload.getItemId(), token);
        return ResponseEntity.ok().body(response);
    }
}
