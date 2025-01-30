package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.BookExerciseRequestDTO;
import com.possoler.respondeai.interfaces.RespondeAiService;
import com.possoler.respondeai.service.BookExerciseService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class BookExerciseController {

    private final RespondeAiService respondeAiService;

    public BookExerciseController(@Qualifier("BookExerciseService") RespondeAiService respondeAiService) {
        this.respondeAiService = respondeAiService;
    }

    @PostMapping("${respondeai-api.endpoint.getBookExerciseData}")
    private ResponseEntity<Object> getBookExerciseData(
        @RequestHeader(name = "Authorization") String token,
        @RequestBody @Valid BookExerciseRequestDTO payload
    ){
        Object response = respondeAiService.getContentMaterial(payload.getExerciseId(), token);
        return ResponseEntity.ok().body(response);
    }
}
