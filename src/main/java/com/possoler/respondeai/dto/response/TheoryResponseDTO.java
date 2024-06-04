package com.possoler.respondeai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TheoryResponseDTO {
    private String lightBody;
    private List<VideoResponseDTO> videos;
}
