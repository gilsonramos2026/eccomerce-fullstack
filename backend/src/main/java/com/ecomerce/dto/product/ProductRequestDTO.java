package com.ecomerce.dto.product;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record ProductRequestDTO(

        @NotBlank(message = "O nome do produto é obrigatório") // 🔴 CORRIGIDO: Mensagem alterada de "preço" para "nome do produto"
        @Size(max = 200, message = "O nome do produto não pode ser maior que 200 caracteres")
        String name,

        String description,

        @NotNull(message = "O preço é obrigatório")
        @DecimalMin(value = "0.0", message = "O preço tem que ser maior ou igual a 0.0")
        BigDecimal price,

        @DecimalMin(value = "0.0", message = "O desconto tem que ser maior ou igual a 0.0")
        BigDecimal discountPrice,

        @NotNull(message = "A quantidade do estoque é obrigatória")
        @Min(value = 0, message = "A quantidade de estoque não pode ser negativa")
        Integer stockQuantity,

        @Size(max = 500, message = "A URL da imagem não pode passar de 500 caracteres")
        String imageUrl,

        @NotNull(message = "O ID da categoria é obrigatório")
        Long categoryId
) {
}
