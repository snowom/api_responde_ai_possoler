package com.possoler.respondeai.dto.response.video_lesson;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class VideoLessonResponseDTO {
    private VideoDTO video;
    private List<CoveredTopicDTO> coveredTopics;
}
