package com.ecomerce.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductResponseDTO(
        Long id,
        String name,
        String description,
        BigDecimal price,
        BigDecimal discountPrice,
        Integer stockQuantity,
        String imageUrl,
        String categoryName,
        BigDecimal rating,
        LocalDateTime createdAt
) {}
