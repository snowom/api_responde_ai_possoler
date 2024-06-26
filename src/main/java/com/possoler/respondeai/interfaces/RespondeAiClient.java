package com.possoler.respondeai.interfaces;

public interface RespondeAiClient {

    /**
     * Realiza Requisicao para API do Responde Ai e retorna objeto obtido na requisicao
     * @author snowom
     * @param itemId
     * @param token
     * @return DataBookExerciseResponseDTO
     */
    Object getData(String itemId, String token);

    /**
     * Gera URI de request para API do Responde Aí
     * @author snowon
     * @param exerciseId
     * @return String
     */
    String buildURIRequest(String exerciseId);
}
