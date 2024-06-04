package com.possoler.respondeai.configs;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConnectionConfig {

    @PostConstruct
    public void allowRestrictedHeaders() {
        System.setProperty("sun.net.http.allowRestrictedHeaders", "true");
    }
}
