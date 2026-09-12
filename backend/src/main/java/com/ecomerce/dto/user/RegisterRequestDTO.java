package com.ecomerce.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dados necessários para registrar um novo usuário no sistema")
public record RegisterRequestDTO(

        @Schema(description = "Nome completo do usuário", example = "João Silva")
        @NotBlank(message = "O nome é obrigatório")
        String name,

        @Schema(description = "Endereço de e-mail único do usuário", example = "joao@email.com")
        @Email(message = "O e-mail deve ser válido")
        @NotBlank(message = "O e-mail é obrigatório")
        String email,

        @Schema(description = "Senha de acesso do usuário", example = "senha123")
        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 6, message = "A senha deve conter no mínimo 6 caracteres")
        String password
) {}

