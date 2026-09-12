package com.ecomerce.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados retornados após uma autenticação bem-sucedida")
public record AuthResponseDTO(

        @Schema(description = "Token JWT emitido para autenticar as próximas requisições HTTP", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        String token,

        @Schema(description = "Nome do usuário autenticado para exibição no frontend", example = "João Silva")
        String name,

        @Schema(description = "Papel/Permissão de acesso do usuário no sistema", example = "CUSTOMER")
        String role
) {}
