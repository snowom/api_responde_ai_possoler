package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.ListExerciseRequestDTO;
import com.possoler.respondeai.interfaces.RespondeAiService;
import com.possoler.respondeai.service.ListExerciseService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class ListExerciseController {

    private final RespondeAiService respondeAiService;

    public ListExerciseController(@Qualifier("listExerciseService") RespondeAiService respondeAiService) {
        this.respondeAiService = respondeAiService;
    }

    @PostMapping("${respondeai-api.endpoint.getListExerciseData}")
    private ResponseEntity<Object> getListExerciseData(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody @Valid ListExerciseRequestDTO payload
    ){
        Object response = respondeAiService.getContentMaterial(payload.getListExerciseId(), token);
        return ResponseEntity.ok().body(response);
    }
}
