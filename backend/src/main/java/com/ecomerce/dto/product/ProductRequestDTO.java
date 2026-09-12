package com.ecomerce.dto.product;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Schema(description = "Dados necessários para criação ou atualização de um produto")
public record ProductRequestDTO(

        @Schema(description = "Nome comercial do produto", example = "Teclado Mecânico RGB")
        @NotBlank(message = "O nome do produto é obrigatório")
        @Size(max = 200, message = "O nome do produto não pode ser maior que 200 caracteres")
        String name,

        @Schema(description = "Descrição detalhada técnica do produto", example = "Teclado mecânico switch blue com layout ABNT2 e iluminação RGB.")
        String description,

        @Schema(description = "Preço original de venda do produto", example = "349.90")
        @NotNull(message = "O preço é obrigatório")
        @DecimalMin(value = "0.0", message = "O preço tem que ser maior ou igual a 0.0")
        BigDecimal price,

        @Schema(description = "Preço promocional com desconto (se aplicável)", example = "299.90")
        @DecimalMin(value = "0.0", message = "O desconto tem que ser maior ou igual a 0.0")
        BigDecimal discountPrice,

        @Schema(description = "Quantidade de unidades disponíveis em estoque", example = "15")
        @NotNull(message = "A quantidade do estoque é obrigatória")
        @Min(value = 0, message = "A quantidade de estoque não pode ser negativa")
        Integer stockQuantity,

        @Schema(description = "URL da imagem de exibição do produto", example = "https://loja.com")
        @Size(max = 500, message = "A URL da imagem não pode passar de 500 caracteres")
        String imageUrl,

        @Schema(description = "ID numérico de referência da categoria vinculada", example = "1")
        @NotNull(message = "O ID da categoria é obrigatório")
        Long categoryId
) {
}
