package com.possoler.respondeai.service;

import com.possoler.respondeai.dto.response.BookExerciseResponseDTO;
import com.possoler.respondeai.interfaces.RespondeAiClient;
import com.possoler.respondeai.helpers.JsonHelper;
import com.possoler.respondeai.interfaces.RespondeAiService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("BookExerciseService")
public class BookExerciseService implements RespondeAiService {

    private final RespondeAiClient respondeAiClient;
    private final JsonHelper jsonHelper;

    public BookExerciseService(
        @Qualifier("BookExerciseClient") RespondeAiClient respondeAiClient,
        JsonHelper jsonHelper
    ) {
        this.jsonHelper = jsonHelper;
        this.respondeAiClient = respondeAiClient;
    }

    @Override
    public Object getContentMaterial(String itemId, String token) {
        var response = respondeAiClient.getData(itemId, token);
        return buildBookResponse(response.toString());
    }

    private BookExerciseResponseDTO buildBookResponse(String responseBody) {
        JSONObject jsonObject = new JSONObject(responseBody);
        List<String> lightSolution = jsonHelper.getArrayObject(jsonObject, "lightSolution");
        String lightBody = jsonHelper.getJsonObjectString(jsonObject, "lightBody");
        String lightAnswer = jsonHelper.getJsonObjectString(jsonObject, "lightAnswer");

        return BookExerciseResponseDTO.builder()
            .lightBody(lightBody)
            .lightAnswer(lightAnswer)
            .lightSolution(lightSolution)
            .build();
    }
}
