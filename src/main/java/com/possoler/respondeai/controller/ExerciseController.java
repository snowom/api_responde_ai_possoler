package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.ExerciseRequestDTO;
import com.possoler.respondeai.service.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @PostMapping("${respondeai-api.endpoint.getExerciseData}")
    private ResponseEntity<Object> getExerciseData(
        @RequestHeader(name = "Authorization") String token,
        @RequestBody @Valid ExerciseRequestDTO payload
    ){
        Object response = exerciseService.getExerciseData(payload.getItemId(), token);
        return ResponseEntity.ok().body(response);
    }
}
