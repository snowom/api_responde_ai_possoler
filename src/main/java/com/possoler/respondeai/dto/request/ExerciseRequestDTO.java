package com.possoler.respondeai.dto.request;

import lombok.Getter;
import javax.validation.constraints.NotEmpty;

public class ExerciseRequestDTO {

    @Getter
    @NotEmpty(message = "O campo \"exerciseId\" não pode ser vazio")
    private String itemId;
}
