package com.ecomerce.dto.order;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Schema(description = "Dados necessários para a criação de um novo pedido")
public record OrderRequestDTO(

        @Schema(description = "Endereço completo de entrega", example = "Av. Paulista, 1000, Apto 51 - São Paulo/SP")
        @NotBlank(message = "O endereço de entrega é obrigatório")
        String shippingAddress,

        @Schema(description = "Lista de itens inclusos no pedido")
        @NotEmpty(message = "O pedido precisa conter pelo menos um item")
        List<OrderItemRequestDTO> items
) {}

