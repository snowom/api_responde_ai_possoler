package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.LessonRequestDTO;
import com.possoler.respondeai.service.VideoLessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class VideoLessonController {

    private final VideoLessonService videoLessonService;

    public VideoLessonController(VideoLessonService videoLessonService){
        this.videoLessonService = videoLessonService;
    }

    @PostMapping("${respondeai-api.endpoint.getVideoLessonData}")
    private ResponseEntity<Object> getVideoLessons(
        @RequestHeader("Authorization") String token,
        @RequestBody @Valid LessonRequestDTO lessonRequestDTO
    ){
        Object response = videoLessonService.getVideoLessonData(lessonRequestDTO.getLessonId(), token);
        return ResponseEntity.ok().body(response);
    }
}
