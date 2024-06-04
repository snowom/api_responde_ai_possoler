package com.possoler.respondeai.client;

import com.possoler.respondeai.configs.RespondeAiRestConfigs;
import com.possoler.respondeai.constants.RequestEndpoints;
import com.possoler.respondeai.interfaces.RespondeAiClient;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component("ListExerciseClient")
public class ListExerciseClient extends RespondeAiRestConfigs implements RespondeAiClient {

    @Override
    public Object getData(String itemId, String token) {
        HttpHeaders header = setHeaders(token);
        final String URI = buildURIRequest(itemId);
        var responseRequest = get(URI, header);
        return getBody(responseRequest);
    }

    @Override
    public String buildURIRequest(String exerciseId) {
        return RequestEndpoints.DOMAIN_REQUEST.concat(RequestEndpoints.LIST_EXERCISE_ENDPOINT).concat(exerciseId);
    }
}
