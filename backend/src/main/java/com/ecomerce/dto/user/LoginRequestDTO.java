package com.ecomerce.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Dados necessários para autenticação de um usuário no sistema")
public record LoginRequestDTO(

        @Schema(description = "Endereço de e-mail cadastrado", example = "joao@email.com")
        @Email(message = "O e-mail deve ser válido")
        @NotBlank(message = "O e-mail é obrigatório")
        String email,

        @Schema(description = "Senha de acesso do usuário", example = "senha123")
        @NotBlank(message = "A senha é obrigatória")
        String password
) {}
