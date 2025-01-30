package com.possoler.respondeai.service;

import com.possoler.respondeai.dto.response.ExerciseResponseDTO;
import com.possoler.respondeai.dto.response.VideoResponseDTO;
import com.possoler.respondeai.helpers.JsonHelper;
import com.possoler.respondeai.interfaces.RespondeAiClient;
import com.possoler.respondeai.interfaces.RespondeAiService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("listExerciseService")
public class ListExerciseService implements RespondeAiService {

    private final RespondeAiClient respondeAiClient;
    private final JsonHelper jsonHelper;

    public ListExerciseService(
        @Qualifier("ListExerciseClient") RespondeAiClient respondeAiClient,
        JsonHelper jsonHelper
    ) {
        this.jsonHelper = jsonHelper;
        this.respondeAiClient = respondeAiClient;
    }

    @Override
    public Object getContentMaterial(String itemId, String token) {
        var response = respondeAiClient.getData(itemId, token);
        return buildListExerciseResponse(response.toString());
    }

    private ExerciseResponseDTO buildListExerciseResponse(String responseBody) {
        JSONObject jsonObject = new JSONObject(responseBody);

        var lightAnswer = jsonHelper.getObject(jsonObject, "lightAnswer");
        var videos = buildVideoResponse(jsonObject);
        var lightSolution = buildLightSolutionResponse(jsonObject);

        return ExerciseResponseDTO.builder()
            .lightSolution(lightSolution)
            .lightAnswer(lightAnswer)
            .videos(videos)
            .build();
    }

    private List<String> buildLightSolutionResponse(JSONObject jsonObject) {
        List<String> lightSolution = new ArrayList<>();
        List<String> lightSolutionResponse = jsonHelper.getJsonObjectsStringFromArray(jsonObject, "lightSolution");
        for(Object lightSolutionObj : lightSolutionResponse) {
            lightSolution.add(lightSolutionObj.toString());
        }
        return lightSolution;
    }

    private List<VideoResponseDTO> buildVideoResponse(JSONObject jsonObject) {
        List<VideoResponseDTO> videos = new ArrayList<>();
        List<JSONObject> videoResponse = jsonHelper.getJsonObjectsFromArray(jsonObject, "videos");
        for (JSONObject object : videoResponse) {
            videos.add(VideoResponseDTO.builder()
                .providerId(jsonHelper.getObject(object, "providerId"))
                .provider(jsonHelper.getObject(object, "provider"))
                .build());
        }
        return videos;
    }
}
