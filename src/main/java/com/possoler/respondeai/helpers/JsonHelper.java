package com.possoler.respondeai.helpers;

import com.possoler.respondeai.exceptions.ServerErrorException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JsonHelper {

    /**
     * Get string contents from a property present in a json object
     * @param jsonObject json object
     * @param jsonPropertyName json property name
     * @return jsonPropertyName json key content string
     */
    public String getJsonObjectString(JSONObject jsonObject, String jsonPropertyName) {
        try {
            return jsonObject.get(jsonPropertyName).toString();
        }catch(Exception e) {
            throw new ServerErrorException("Falha ao obter objeto " + "\"" + jsonPropertyName + "\"");
        }
    }

    /**
     * Get json object contents from a property present in a json object
     * @param jsonObject json object
     * @param jsonPropertyName json property name
     * @return jsonPropertyName json key content string
     */
    public JSONObject getJsonObject(JSONObject jsonObject, String jsonPropertyName) {
        try {
            return (JSONObject) jsonObject.get(jsonPropertyName);
        }catch(Exception e) {
            throw new ServerErrorException("Falha ao obter objeto " + "\"" + jsonPropertyName + "\"");
        }
    }


    /**
     * Get string contents from an array property present in a json object
     * @param jsonObject json object
     * @param jsonPropertyName json property name
     * @return jsonPropertyName json key content string
     */
    public List<String> getArrayObject(JSONObject jsonObject, String jsonPropertyName) {
        try{
            List<String> result = new ArrayList<>();
            JSONArray jsonArray = jsonObject.getJSONArray(jsonPropertyName);
            for(Object obj : jsonArray) {
                result.add(obj.toString());
            }
            return result;
        }catch (Exception e) {
            throw new ServerErrorException("Falha ao obter objeto " + "\"" + jsonPropertyName + "\"");
        }
    }

    /**
     * Gets a list of JSON objects strings present in a JSON array object
     * @param jsonObject json object
     * @param jsonArrayPropertyName json array property name
     * @return list of json objects contained in the array
     */
    public List<String> getJsonObjectsStringFromArray(JSONObject jsonObject, String jsonArrayPropertyName) {
        if(jsonObject.has(jsonArrayPropertyName)) {
            List<String> jsonObjects = new ArrayList<>();
            JSONArray jsonArray = (JSONArray) jsonObject.get(jsonArrayPropertyName);
            for(Object obj : jsonArray) {
                jsonObjects.add(obj.toString());
            }
            return jsonObjects;
        }
        throw new ServerErrorException("Falha ao obter objeto " + "\"" + jsonArrayPropertyName + "\"");
    }

    /**
     * Gets a list of JSON objects present in a JSON array object
     * @param jsonObject json object
     * @param jsonArrayPropertyName json array property name
     * @return list of json objects contained in the array
     */
    public List<JSONObject> getJsonObjectsFromArray(JSONObject jsonObject, String jsonArrayPropertyName) {
        if(jsonObject.has(jsonArrayPropertyName)) {
            List<JSONObject> jsonObjects = new ArrayList<>();
            JSONArray jsonArray = (JSONArray) jsonObject.get(jsonArrayPropertyName);
            for(Object obj : jsonArray) {
                jsonObjects.add((JSONObject) obj);
            }
            return jsonObjects;
        }
        throw new ServerErrorException("Falha ao obter objeto " + "\"" + jsonArrayPropertyName + "\"");
    }
}
