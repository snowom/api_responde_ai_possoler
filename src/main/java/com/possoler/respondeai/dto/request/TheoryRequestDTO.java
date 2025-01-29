package com.possoler.respondeai.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;

public class TheoryRequestDTO {
    @Getter
    @NotEmpty(message = "O campo \"theory_id\" não pode ser vazio")
    @JsonProperty(value = "theory_id", required = true)
    private String theoryId;
}
