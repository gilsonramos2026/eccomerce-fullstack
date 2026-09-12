package com.ecomerce.service;

import com.ecomerce.dto.product.ProductRequestDTO;
import com.ecomerce.dto.product.ProductResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    Page<ProductResponseDTO> findAll(Pageable pageable);

    Page<ProductResponseDTO> search(String query, Pageable pageable); // 💡 ADICIONADO: Método de busca integrado

    ProductResponseDTO findById(Long id);

    ProductResponseDTO create(ProductRequestDTO dto);

    ProductResponseDTO update(Long id, ProductRequestDTO dto);

    void delete(Long id);
}
