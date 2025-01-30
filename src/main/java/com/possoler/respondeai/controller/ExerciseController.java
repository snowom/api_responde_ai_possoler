package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.ExerciseRequestDTO;
import com.possoler.respondeai.interfaces.RespondeAiService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class ExerciseController {

    private final RespondeAiService respondeAiService;

    public ExerciseController(@Qualifier("ExerciseService") RespondeAiService respondeAiService) {
        this.respondeAiService = respondeAiService;
    }

    @PostMapping("${respondeai-api.endpoint.getExerciseData}")
    private ResponseEntity<Object> getExerciseData(
        @RequestHeader(name = "Authorization") String token,
        @RequestBody @Valid ExerciseRequestDTO payload
    ){
        Object response = respondeAiService.getContentMaterial(payload.getExerciseId(), token);
        return ResponseEntity.ok().body(response);
    }
}
