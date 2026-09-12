package com.ecomerce.mapper;

import com.ecomerce.dto.category.CategoryRequestDTO;
import com.ecomerce.dto.category.CategoryResponseDTO;
import com.ecomerce.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponseDTO toResponseDTO(Category category);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "slug", ignore = true) // Ignorado pois o slug será gerado no Service a partir do nome
    Category toEntity(CategoryRequestDTO requestDTO);
}
