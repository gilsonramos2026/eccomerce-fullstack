package com.ecomerce.dto.category;

import io.swagger.v3.oas.annotations.media.Schema; // 💡 Importação adicionada
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dados necessários para criação ou atualização de uma categoria") // 💡 Descrição do DTO
public record CategoryRequestDTO(

        @Schema(description = "Nome da categoria do e-commerce", example = "Eletrônicos") // 💡 Descrição do campo com exemplo real
        @NotBlank(message = "O nome da categoria é obrigatório")
        @Size(max = 100, message = "O nome da categoria não pode passar de 100 caracteres")
        String name
) {}
