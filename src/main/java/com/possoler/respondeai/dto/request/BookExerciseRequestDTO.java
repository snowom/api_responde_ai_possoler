package com.possoler.respondeai.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import javax.validation.constraints.NotEmpty;

public class BookExerciseRequestDTO {

    @Getter
    @NotEmpty(message = "O campo \"exercise_id\" não pode ser vazio")
    @JsonProperty(value = "exercise_id", required = true)
    private String exerciseId;
}
