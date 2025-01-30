package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.TheoryRequestDTO;
import com.possoler.respondeai.interfaces.RespondeAiService;
import com.possoler.respondeai.service.TheoryService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class TheoryController {

    private final RespondeAiService respondeAiService;

    public TheoryController(@Qualifier("TheoryService") RespondeAiService respondeAiService) {
        this.respondeAiService = respondeAiService;
    }

    @PostMapping("${respondeai-api.endpoint.getTheoryData}")
    private ResponseEntity<Object> getTheoryData(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody @Valid TheoryRequestDTO payload
    ){
        Object response = respondeAiService.getContentMaterial(payload.getTheoryId(), token);
        return ResponseEntity.ok().body(response);
    }
}
