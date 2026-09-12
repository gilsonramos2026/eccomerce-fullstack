package com.ecomerce.service;

import com.ecomerce.dto.category.CategoryRequestDTO;
import com.ecomerce.dto.category.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDTO> findAll();
    CategoryResponseDTO findById(Long id);
    CategoryResponseDTO create(CategoryRequestDTO dto);
    void delete(Long id);
}
