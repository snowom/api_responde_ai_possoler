package com.possoler.respondeai.service;

import com.possoler.respondeai.dto.response.BookExerciseResponseDTO;
import com.possoler.respondeai.exceptions.ServerErrorException;
import com.possoler.respondeai.interfaces.RespondeAiClient;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookExerciseService {

    private final RespondeAiClient respondeAiClient;

    public BookExerciseService(@Qualifier("BookExerciseClient") RespondeAiClient respondeAiClient) {
        this.respondeAiClient = respondeAiClient;
    }

    public Object getBookExerciseData(String itemId, String token) {
        var response = respondeAiClient.getData(itemId, token);
        return buildBookResponse(response.toString());
    }

    private BookExerciseResponseDTO buildBookResponse(String responseBody) {
        JSONObject jsonObject = new JSONObject(responseBody);

        var lightSolution = buildLightSolutionResponse(jsonObject);
        var lightBody = buildLightBodyResponse(jsonObject);
        var lightAnswer = buildLightAnswerResponse(jsonObject);

        return BookExerciseResponseDTO.builder()
            .lightBody(lightBody)
            .lightAnswer(lightAnswer)
            .lightSolution(lightSolution)
            .build();
    }

    private String buildLightBodyResponse(JSONObject jsonObject) {
        try{
            return jsonObject.get("lightBody").toString();
        }catch (Exception e) {
            throw new ServerErrorException("[Book Exercise] - Falha ao obter objeto \"lightBody\"");
        }
    }

    private String buildLightAnswerResponse(JSONObject jsonObject) {
        try{
            return jsonObject.get("lightAnswer").toString();
        }catch (Exception e) {
            throw new ServerErrorException("[Book Exercise] - Falha ao obter objeto \"lightAnswer\"");
        }
    }

    private List<String> buildLightSolutionResponse(JSONObject jsonObject) {
        try{
            List<String> lightSolution = new ArrayList<>();
            JSONArray lightSolutionResponse = jsonObject.getJSONArray("lightSolution");

            for(int i=0; i<lightSolutionResponse.length(); i++) {
                lightSolution.add(lightSolutionResponse.get(i).toString());
            }
            return lightSolution;
        }catch (Exception e) {
            throw new ServerErrorException("[Book Exercise] - Falha ao obter objeto \"lightSolution\"");
        }
    }
}
