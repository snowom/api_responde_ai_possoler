package com.possoler.respondeai.service;

import com.possoler.respondeai.client.*;
import com.possoler.respondeai.dto.request.GatewayRequestDTO;
import com.possoler.respondeai.exceptions.ClientErrorException;
import com.possoler.respondeai.helpers.JsonHelper;
import com.possoler.respondeai.interfaces.RespondeAiService;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class GatewayService {

    private final JsonHelper jsonHelper;

    public GatewayService(JsonHelper jsonHelper) {
        this.jsonHelper = jsonHelper;
    }

    public RespondeAiService getInstance(GatewayRequestDTO gatewayRequestDTO) {
        if (gatewayRequestDTO.getUrl().contains("app.respondeai.com.br/aprender") && gatewayRequestDTO.getUrl().contains("/teoria/")) {
            setItemIdFromDTO(gatewayRequestDTO);
            return new TheoryService(new TheoryClient(), jsonHelper);
        }
        if (gatewayRequestDTO.getUrl().contains("app.respondeai.com.br/aprender") && gatewayRequestDTO.getUrl().contains("/exercicio/")) {
            setItemIdFromDTO(gatewayRequestDTO);
            return new ExerciseService(new ExerciseClient(), jsonHelper);
        }
        if ((gatewayRequestDTO.getUrl().contains("app.respondeai.com.br/aprender") || gatewayRequestDTO.getUrl().contains("app.respondeai.com.br/praticar")) && gatewayRequestDTO.getUrl().contains("/exercicio-lista/")) {
            setItemIdFromDTO(gatewayRequestDTO);
            return new ListExerciseService(new ListExerciseClient(), jsonHelper);
        }
        if (
            (gatewayRequestDTO.getUrl().contains("app.respondeai.com.br/") &&
            gatewayRequestDTO.getUrl().contains("materias/solucionario/livro") &&
            gatewayRequestDTO.getUrl().contains("/edicao/") &&
            Pattern.compile("\\/exercicio\\/[0-9]+").matcher(gatewayRequestDTO.getUrl()).find()) ||
            (gatewayRequestDTO.getUrl().contains("/conteudo/")) && gatewayRequestDTO.getUrl().contains("/livro/")
        ) {
            setItemIdFromDTO(gatewayRequestDTO);
            return new BookExerciseService(new BookExerciseClient(), jsonHelper);
        }
        if (gatewayRequestDTO.getUrl().contains("/lecture/aulao/")) {
            setItemIdFromDTO(gatewayRequestDTO);
            return new VideoLessonService(new VideoLessonClient());
        }
        throw new ClientErrorException("Url inválida ou não suportada pela aplicação");
    }

    private void setItemIdFromDTO(GatewayRequestDTO gatewayRequestDTO) {
        String itemId = gatewayRequestDTO.getUrl().split("/")[gatewayRequestDTO.getUrl().split("/").length-1];
        gatewayRequestDTO.setItemId(itemId);
    }
}
