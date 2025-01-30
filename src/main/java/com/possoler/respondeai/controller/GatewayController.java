package com.possoler.respondeai.controller;

import com.possoler.respondeai.dto.request.GatewayRequestDTO;
import com.possoler.respondeai.interfaces.RespondeAiService;
import com.possoler.respondeai.service.GatewayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class GatewayController {

    private final GatewayService gatewayService;

    public GatewayController(GatewayService gatewayService) {
        this.gatewayService = gatewayService;
    }

    @PostMapping("/v1/gateway")
    private ResponseEntity<Object> gatewayRespondeAi (
            @RequestHeader("Authorization") String token,
            @RequestBody @Valid GatewayRequestDTO gatewayRequestDTO
    ) {
        RespondeAiService instance = gatewayService.getInstance(gatewayRequestDTO);
        Object response = instance.getContentMaterial(gatewayRequestDTO.getItemId(), token);
        return ResponseEntity.ok(response);
    }
}
