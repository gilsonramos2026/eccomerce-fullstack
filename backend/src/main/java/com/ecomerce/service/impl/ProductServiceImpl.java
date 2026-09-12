package com.ecomerce.service.impl; // 🔴 CORRIGIDO: Ajustado para o pacote padrão do seu projeto

// 🔴 CORRIGIDOS: Todos os imports apontando para com.ecomerce
import com.ecomerce.dto.product.ProductRequestDTO;
import com.ecomerce.dto.product.ProductResponseDTO;
import com.ecomerce.entity.Category;
import com.ecomerce.entity.Product;
import com.ecomerce.mapper.ProductMapper;
import com.ecomerce.repository.CategoryRepository;
import com.ecomerce.repository.ProductRepository;
import com.ecomerce.service.ProductService;
import jakarta.persistence.EntityNotFoundException; // 💡 DICA: Use EntityNotFoundException se ainda não criou a sua personalizada
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Override
    public Page<ProductResponseDTO> findAll(Pageable pageable) {
        return productRepository.findAll(pageable).map(productMapper::toResponseDTO);
    }

    @Override // 💡 ADICIONADO: Implementação do método exigido pela interface ProductService
    public Page<ProductResponseDTO> search(String query, Pageable pageable) {
        return productRepository.search(query, pageable).map(productMapper::toResponseDTO);
    }

    @Override
    public ProductResponseDTO findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com o ID: " + id));
        return productMapper.toResponseDTO(product);
    }

    @Override
    @Transactional
    public ProductResponseDTO create(ProductRequestDTO dto) {
        Category category = categoryRepository.findById(dto.categoryId())
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com o ID: " + dto.categoryId()));

        Product product = Product.builder()
                .name(dto.name())
                .description(dto.description())
                .price(dto.price())
                .discountPrice(dto.discountPrice())
                .stockQuantity(dto.stockQuantity())
                .imageUrl(dto.imageUrl())
                .category(category)
                .build();

        return productMapper.toResponseDTO(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com o ID: " + id));
        Category category = categoryRepository.findById(dto.categoryId())
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com o ID: " + dto.categoryId()));

        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setDiscountPrice(dto.discountPrice());
        product.setStockQuantity(dto.stockQuantity());
        product.setImageUrl(dto.imageUrl());
        product.setCategory(category);

        return productMapper.toResponseDTO(product);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Produto não encontrado com o ID: " + id);
        }
        productRepository.deleteById(id);
    }
}
