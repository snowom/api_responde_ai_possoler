package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.LessonRequestDTO;
import com.possoler.respondeai.interfaces.RespondeAiService;
import com.possoler.respondeai.service.VideoLessonService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class VideoLessonController {

    private final RespondeAiService respondeAiService;

    public VideoLessonController(@Qualifier("VideoLessonService") RespondeAiService respondeAiService){
        this.respondeAiService = respondeAiService;
    }

    @PostMapping("${respondeai-api.endpoint.getVideoLessonData}")
    private ResponseEntity<Object> getVideoLessons(
        @RequestHeader("Authorization") String token,
        @RequestBody @Valid LessonRequestDTO lessonRequestDTO
    ){
        Object response = respondeAiService.getContentMaterial(lessonRequestDTO.getLessonId(), token);
        return ResponseEntity.ok().body(response);
    }
}
