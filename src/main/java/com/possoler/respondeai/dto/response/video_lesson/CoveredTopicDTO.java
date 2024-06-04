package com.possoler.respondeai.dto.response.video_lesson;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CoveredTopicDTO {
    private String firstExerciseId;
    private String id;
    private String name;
    private String subjectId;
    private String theoryId;
}
