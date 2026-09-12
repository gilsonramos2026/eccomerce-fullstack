package com.ecomerce.mapper;

import com.ecomerce.dto.product.ProductRequestDTO;
import com.ecomerce.dto.product.ProductResponseDTO;
import com.ecomerce.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "categoryName", source = "category.name")
    ProductResponseDTO toResponseDTO(Product product);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true) // Ignorado para ser associado manualmente no Service via ID
    @Mapping(target = "rating", ignore = true)   // Ignorado pois novos produtos começam sem avaliação
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Product toEntity(ProductRequestDTO requestDTO);
}
