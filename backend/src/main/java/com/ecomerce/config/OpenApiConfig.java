package com.ecomerce.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI ecommerceOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("E-commerce API")
                .description("API REST para catálogo, pedidos e usuários")
                .version("v1.0.0"));
    }
}

