package com.possoler.respondeai.service;

import com.possoler.respondeai.dto.response.BookExerciseResponseDTO;
import com.possoler.respondeai.exceptions.ServerErrorException;
import com.possoler.respondeai.interfaces.RespondeAiClient;
import com.possoler.respondeai.utils.json.JsonHelper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookExerciseService {

    private final RespondeAiClient respondeAiClient;
    private final JsonHelper jsonHelper;

    public BookExerciseService(
        @Qualifier("BookExerciseClient") RespondeAiClient respondeAiClient,
        JsonHelper jsonHelper
    ) {
        this.jsonHelper = jsonHelper;
        this.respondeAiClient = respondeAiClient;
    }

    public Object getBookExerciseData(String itemId, String token) {
        var response = respondeAiClient.getData(itemId, token);
        return buildBookResponse(response.toString());
    }

    private BookExerciseResponseDTO buildBookResponse(String responseBody) {
        JSONObject jsonObject = new JSONObject(responseBody);
        List<String> lightSolution = jsonHelper.getArrayObject(jsonObject, "lightSolution");
        String lightBody = jsonHelper.getObject(jsonObject, "lightBody");
        String lightAnswer = jsonHelper.getObject(jsonObject, "lightAnswer");

        return BookExerciseResponseDTO.builder()
            .lightBody(lightBody)
            .lightAnswer(lightAnswer)
            .lightSolution(lightSolution)
            .build();
    }
}
