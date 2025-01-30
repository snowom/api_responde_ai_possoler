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

    private final String BASE_URL_LEARN = "app.respondeai.com.br/aprender";
    private final String BASE_URL_PRATICE = "app.respondeai.com.br/praticar";
    private final String THEORY_PATH = "/teoria/";
    private final String EXERCISE_PATH = "/exercicio/";
    private final String LIST_EXERCISE_PATH = "/exercicio-lista/";
    private final String BOOK_PATH = "/livro/";
    private final String URL_DOMAIN = "app.respondeai.com.br/";
    private final String SOLUTION_BOOK_PATH = "materias/solucionario/livro";
    private final String BOOK_EDITION_PATH = "/edicao/";
    private final String BOOK_CONTENT_PATH = "/conteudo/";
    private final String BOOK_EXERCISE_ID_REGEX = "\\/exercicio\\/[0-9]+";
    private final String VIDEO_LESSON_PATH = "/lecture/aulao/";

    private final JsonHelper jsonHelper;

    public GatewayService(JsonHelper jsonHelper) {
        this.jsonHelper = jsonHelper;
    }

    public RespondeAiService getInstance(GatewayRequestDTO gatewayRequestDTO) {
        if (gatewayRequestDTO.getUrl().contains(BASE_URL_LEARN) && gatewayRequestDTO.getUrl().contains(THEORY_PATH)) {
            setItemIdFromDTO(gatewayRequestDTO);
            return new TheoryService(new TheoryClient(), jsonHelper);
        }
        if (gatewayRequestDTO.getUrl().contains(BASE_URL_LEARN) && gatewayRequestDTO.getUrl().contains(EXERCISE_PATH)) {
            setItemIdFromDTO(gatewayRequestDTO);
            return new ExerciseService(new ExerciseClient(), jsonHelper);
        }
        if (
            (gatewayRequestDTO.getUrl().contains(BASE_URL_LEARN) ||
            gatewayRequestDTO.getUrl().contains(BASE_URL_PRATICE)) &&
            gatewayRequestDTO.getUrl().contains(LIST_EXERCISE_PATH)
        ) {
            setItemIdFromDTO(gatewayRequestDTO);
            return new ListExerciseService(new ListExerciseClient(), jsonHelper);
        }
        if (
            (gatewayRequestDTO.getUrl().contains(URL_DOMAIN) &&
            gatewayRequestDTO.getUrl().contains(SOLUTION_BOOK_PATH) &&
            gatewayRequestDTO.getUrl().contains(BOOK_EDITION_PATH) &&
            Pattern.compile(BOOK_EXERCISE_ID_REGEX).matcher(gatewayRequestDTO.getUrl()).find()) ||
            (gatewayRequestDTO.getUrl().contains(BOOK_CONTENT_PATH)) && gatewayRequestDTO.getUrl().contains(BOOK_PATH)
        ) {
            setItemIdFromDTO(gatewayRequestDTO);
            return new BookExerciseService(new BookExerciseClient(), jsonHelper);
        }
        if (gatewayRequestDTO.getUrl().contains(VIDEO_LESSON_PATH)) {
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
