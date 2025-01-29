package com.possoler.respondeai.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;

public class ListExerciseRequestDTO {
    @Getter
    @NotEmpty(message = "O campo \"list_exercise_id\" não pode ser vazio")
    @JsonProperty(value = "list_exercise_id", required = true)
    private String listExerciseId;
}
