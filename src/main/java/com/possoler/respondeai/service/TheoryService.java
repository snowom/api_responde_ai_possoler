package com.possoler.respondeai.service;


import com.possoler.respondeai.dto.response.TheoryResponseDTO;
import com.possoler.respondeai.dto.response.VideoResponseDTO;
import com.possoler.respondeai.exceptions.ServerErrorException;
import com.possoler.respondeai.helpers.JsonHelper;
import com.possoler.respondeai.interfaces.RespondeAiClient;
import com.possoler.respondeai.interfaces.RespondeAiService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("TheoryService")
public class TheoryService implements RespondeAiService {

    private final RespondeAiClient respondeAiClient;
    private final JsonHelper jsonHelper;

    public TheoryService(
        @Qualifier("TheoryClient") RespondeAiClient respondeAiClient,
        JsonHelper jsonHelper
    ) {
        this.jsonHelper = jsonHelper;
        this.respondeAiClient = respondeAiClient;
    }

    @Override
    public Object getContentMaterial(String itemId, String token) {
        var response = respondeAiClient.getData(itemId, token);
        return buildTheoryResponse(response.toString());
    }

    private TheoryResponseDTO buildTheoryResponse(String responseBody) {
        var jsonObject = new JSONObject(responseBody);
        var lightBody = jsonHelper.getObject(jsonObject, "lightBody");
        var videos = buildVideoResponse(jsonObject);

        return TheoryResponseDTO.builder()
            .lightBody(lightBody)
            .videos(videos)
            .build();
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
