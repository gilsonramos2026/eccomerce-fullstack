package com.ecomerce.dto.product; // 🔴 CORRIGIDO: Alinhado para o pacote padrão com.ecomerce.dto.product

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;

@Schema(description = "Parâmetros de entrada para aplicação de filtros dinâmicos no catálogo de produtos")
public record ProductFilterDTO(

        @Schema(description = "Texto para busca por aproximação no nome do produto", example = "Teclado")
        String search,

        @Schema(description = "ID numérico da categoria para filtragem direta", example = "2")
        Long categoryId,

        @Schema(description = "Preço mínimo para estipular a faixa de busca", example = "50.00")
        BigDecimal minPrice,

        @Schema(description = "Preço máximo para estipular a faixa de busca", example = "500.00")
        BigDecimal maxPrice,

        @Schema(description = "Sinalizador para listar exclusivamente produtos que possuem estoque ativo", example = "true")
        Boolean onlyInStock
) {}
