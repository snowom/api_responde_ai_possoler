package com.possoler.respondeai.utils.json;

import com.possoler.respondeai.exceptions.ServerErrorException;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class JsonHelper {

    /**
     * Get content from a property present in a json object
     * @param jsonObject json object
     * @param jsonPropertyName json property name
     * @return jsonPropertyName json key content string
     */
    public String getObject(JSONObject jsonObject, String jsonPropertyName) {
        try {
            return jsonObject.get(jsonPropertyName).toString();
        }catch(Exception e) {
            throw new ServerErrorException("Falha ao obter objeto " + "\"" + jsonPropertyName + "\"");
        }
    }

    /**
     * Get content from an array property present in a json object
     * @param jsonObject json object
     * @param jsonPropertyName json property name
     * @return jsonPropertyName json key content string
     */
    public List<String> getArrayObject(JSONObject jsonObject, String jsonPropertyName) {
        try{
            List<String> result = new ArrayList<>();
            JSONArray jsonArray = jsonObject.getJSONArray(jsonPropertyName);

            for(int i=0; i<jsonArray.length(); i++) {
                result.add(jsonArray.get(i).toString());
            }
            return result;
        }catch (Exception e) {
            throw new ServerErrorException("Falha ao obter objeto " + "\"" + jsonPropertyName + "\"");
        }
    }
}
