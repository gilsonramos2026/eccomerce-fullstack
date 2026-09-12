package com.ecomerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Desativa CSRF temporariamente para permitir testes de POST/PUT/DELETE no Swagger
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Libera totalmente os endpoints do Swagger e da documentação
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/api-docs/**"
                        ).permitAll()
                        // Libera também as listagens públicas do e-commerce
                        .requestMatchers("/api/v1/products/**").permitAll()
                        // Qualquer outra requisição precisará de autenticação mais para frente
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
