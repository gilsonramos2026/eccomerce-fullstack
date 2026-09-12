package com.ecomerce.dto.order;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Dados do item para compor o pedido")
public record OrderItemRequestDTO(

        @Schema(description = "ID do produto", example = "1")
        @NotNull(message = "O ID do produto é obrigatório")
        Long productId,

        @Schema(description = "Quantidade comprada", example = "2")
        @NotNull(message = "A quantidade é obrigatória")
        @Min(value = 1, message = "A quantidade mínima para compra é 1")
        Integer quantity
) {}

