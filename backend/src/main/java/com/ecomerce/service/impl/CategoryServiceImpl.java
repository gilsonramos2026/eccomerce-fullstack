package com.ecomerce.service.impl;

import com.ecomerce.dto.category.CategoryRequestDTO;
import com.ecomerce.dto.category.CategoryResponseDTO;
import com.ecomerce.entity.Category;
import com.ecomerce.mapper.CategoryMapper;
import com.ecomerce.repository.CategoryRepository;
import com.ecomerce.service.CategoryService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public List<CategoryResponseDTO> findAll() {
        // ✅ Usando o Mapper para converter a lista de entidades em DTOs
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toResponseDTO)
                .toList();
    }

    @Override
    public CategoryResponseDTO findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada: " + id));

        // ✅ Usando o Mapper para converter a entidade encontrada em DTO
        return categoryMapper.toResponseDTO(category);
    }

    @Override
    @Transactional
    public CategoryResponseDTO create(CategoryRequestDTO dto) {
        // 💡 Regra do banco: Ajustando a consulta para bater com o método do repositório
        String slug = dto.name().toLowerCase().trim().replaceAll("\\s+", "-");

        if (categoryRepository.existsBySlug(slug)) {
            throw new EntityExistsException("Categoria já existe com este nome/slug: " + dto.name());
        }

        // ✅ Usando o Mapper para converter DTO de entrada para Entidade
        Category category = categoryMapper.toEntity(dto);
        category.setSlug(slug);

        Category saved = categoryRepository.save(category);

        // ✅ Usando o Mapper para retornar o DTO de saída preenchido
        return categoryMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Categoria não encontrada com o ID: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
