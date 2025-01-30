package com.possoler.respondeai.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

public class GatewayRequestDTO {
    @Getter
    @NotEmpty(message = "O campo \"url\" não pode ser vazio")
    @JsonProperty(value = "url", required = true)
    private String url;
    @Getter
    @Setter
    private String itemId;
}
