package com.possoler.respondeai.service;

import com.possoler.respondeai.dto.response.video_lesson.CoveredTopicDTO;
import com.possoler.respondeai.dto.response.video_lesson.VideoDTO;
import com.possoler.respondeai.dto.response.video_lesson.VideoLessonResponseDTO;
import com.possoler.respondeai.helpers.JsonHelper;
import com.possoler.respondeai.interfaces.RespondeAiClient;
import com.possoler.respondeai.interfaces.RespondeAiService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("VideoLessonService")
public class VideoLessonService implements RespondeAiService {

    private final String PROVIDER_JSON_PROPERTY_NAME = "provider";
    private final String PROVIDERID_JSON_PROPERTY_NAME = "providerId";
    private final String VIDEO_JSON_PROPERTY_NAME = "video";
    private final String VIDEO_NAME_PROPERTY_NAME = "name";
    private final String COVERED_TOPIC_PROPERTY_NAME = "coveredTopics";
    private final String LECTURE_MODULES_PROPERTY_NAME = "lectureModules";
    private final String COVERED_TOPIC_FIRST_EXERCISE_ID_PROPERTY_NAME = "firstExerciseId";
    private final String COVERED_TOPIC_ID_PROPERTY_NAME = "id";
    private final String COVERED_TOPIC_NAME_PROPERTY_NAME = "name";
    private final String COVERED_TOPIC_SUBJECT_ID_PROPERTY_NAME = "subjectId";
    private final String COVERED_TOPIC_THEORY_ID_PROPERTY_NAME = "theoryId";

    private final RespondeAiClient respondeAiClient;
    private final JsonHelper jsonHelper;

    public VideoLessonService(
        @Qualifier("VideoLessonClient") RespondeAiClient respondeAiClient,
        JsonHelper jsonHelper
    ) {
        this.jsonHelper = jsonHelper;
        this.respondeAiClient = respondeAiClient;
    }

    @Override
    public Object getContentMaterial(String itemId, String token) {
        var response = respondeAiClient.getData(itemId, token);
        return buildVideoLeassonResponse(response.toString());
    }

    private List<VideoLessonResponseDTO> buildVideoLeassonResponse(String responseBody) {
        var videosResponse = new ArrayList<VideoLessonResponseDTO>();
        var jsonObject = new JSONObject(responseBody);
        var lectureModes = jsonHelper.getJsonObjectsFromArray(jsonObject, LECTURE_MODULES_PROPERTY_NAME);

        for (JSONObject lectureMode : lectureModes) {
            var coveredTopics = buildCoveredTopicsResponse(lectureMode);
            var video = buildVideoResponse(lectureMode);
            videosResponse.add(VideoLessonResponseDTO.builder().video(video).coveredTopics(coveredTopics).build());
        }
        return videosResponse;
    }

    private VideoDTO buildVideoResponse(JSONObject jsonObject) {
        var videoName = jsonHelper.getJsonObjectString(jsonObject, VIDEO_NAME_PROPERTY_NAME);
        var video = jsonHelper.getJsonObject(jsonObject, VIDEO_JSON_PROPERTY_NAME);
        var videoProvider = jsonHelper.getJsonObjectString(video, PROVIDER_JSON_PROPERTY_NAME);
        var videoProviderId = jsonHelper.getJsonObjectString(video, PROVIDERID_JSON_PROPERTY_NAME);
        return VideoDTO.builder().name(videoName).provider(videoProvider).providerId(videoProviderId).build();
    }

    private List<CoveredTopicDTO> buildCoveredTopicsResponse(JSONObject jsonObject) {
        var coveredTopics = new ArrayList<CoveredTopicDTO>();
        List<JSONObject> coveredTopicsArray = jsonHelper.getJsonObjectsFromArray(jsonObject, COVERED_TOPIC_PROPERTY_NAME);

        for(JSONObject coveredTopic : coveredTopicsArray) {
            var firstExerciseId = jsonHelper.getJsonObjectString(coveredTopic, COVERED_TOPIC_FIRST_EXERCISE_ID_PROPERTY_NAME);
            var id = jsonHelper.getJsonObjectString(coveredTopic, COVERED_TOPIC_ID_PROPERTY_NAME);
            var name = jsonHelper.getJsonObjectString(coveredTopic, COVERED_TOPIC_NAME_PROPERTY_NAME);
            var subjectId = jsonHelper.getJsonObjectString(coveredTopic, COVERED_TOPIC_SUBJECT_ID_PROPERTY_NAME);
            var theoryId = jsonHelper.getJsonObjectString(coveredTopic, COVERED_TOPIC_THEORY_ID_PROPERTY_NAME);
            coveredTopics.add(CoveredTopicDTO.builder().id(id).name(name).firstExerciseId(firstExerciseId).subjectId(subjectId).theoryId(theoryId).build());
        }
        return coveredTopics;
    }
}
