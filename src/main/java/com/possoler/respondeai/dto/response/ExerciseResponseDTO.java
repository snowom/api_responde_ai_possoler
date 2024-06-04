package com.possoler.respondeai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseResponseDTO {
    private List<String> lightSolution;
    private String lightAnswer;
    private List<VideoResponseDTO> videos;
}
