package com.possoler.respondeai.service;

import com.possoler.respondeai.dto.response.ExerciseResponseDTO;
import com.possoler.respondeai.dto.response.VideoResponseDTO;
import com.possoler.respondeai.exceptions.ServerErrorException;
import com.possoler.respondeai.interfaces.RespondeAiClient;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ListExerciseService {

    private final RespondeAiClient respondeAiClient;

    public ListExerciseService(@Qualifier("ListExerciseClient") RespondeAiClient respondeAiClient) {
        this.respondeAiClient = respondeAiClient;
    }

    public Object getListExerciseData(String itemId, String token) {
        var response = respondeAiClient.getData(itemId, token);
        return buildListExerciseResponse(response.toString());
    }

    private ExerciseResponseDTO buildListExerciseResponse(String responseBody) {
        JSONObject jsonObject = new JSONObject(responseBody);

        var lightAnswer = buildLightAnswerResponse(jsonObject);
        var videos = buildVideoResponse(jsonObject);
        var lightSolution = buildLightSolutionResponse(jsonObject);

        return ExerciseResponseDTO.builder()
            .lightSolution(lightSolution)
            .lightAnswer(lightAnswer)
            .videos(videos)
            .build();
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
            throw new ServerErrorException("[List Exercise] - Falha ao obter objeto \"lightSolution\"");
        }
    }

    private String buildLightAnswerResponse(JSONObject jsonObject) {
        try{
            return jsonObject.get("lightAnswer").toString();
        }catch (Exception e) {
            throw new ServerErrorException("[List Exercise] - Falha ao obter objeto \"lightAnswer\"");
        }
    }

    private List<VideoResponseDTO> buildVideoResponse(JSONObject jsonObject) {
        List<VideoResponseDTO> videos = new ArrayList<>();

        try{
            JSONArray videoResponse = (JSONArray) jsonObject.get("videos");
            for(int i=0; i<videoResponse.length(); i++) {
                videos.add(VideoResponseDTO.builder()
                .providerId((String) videoResponse.getJSONObject(i).get("providerId"))
                .provider((String) videoResponse.getJSONObject(i).get("provider"))
                .build());
            }
        }catch (Exception e) {
            throw new ServerErrorException("[List Exercise] - Falha ao obter objeto \"videos\"");
        }

        return videos;
    }
}
