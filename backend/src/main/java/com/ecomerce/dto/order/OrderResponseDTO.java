package com.ecomerce.dto.order;

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "Dados detalhados do pedido devolvidos pela API")
public record OrderResponseDTO(
        Long id,
        Long userId,
        String userName,
        String status,
        BigDecimal totalAmount,
        String shippingAddress,
        LocalDateTime createdAt,
        List<OrderItemResponseDTO> items
) {}

