package com.possoler.respondeai.dto.response.video_lesson;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class VideoLessonResponseDTO {
    private String resourceType;
    @JsonProperty(value = "lesson_name")
    private String lessonName;
    @JsonProperty(value = "video_lessons")
    private List<VideoLessonDTO> videoLessonDTO;
}
