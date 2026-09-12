package com.ecomerce.service;

import com.ecomerce.dto.product.ProductRequestDTO;
import com.ecomerce.entity.Category;
import com.ecomerce.entity.Product;
import com.ecomerce.mapper.ProductMapper;
import com.ecomerce.repository.CategoryRepository;
import com.ecomerce.repository.ProductRepository;
import com.ecomerce.service.impl.ProductServiceImpl; // 💡 Injetar a implementação real
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductServiceImpl productService; // 🔴 CORRIGIDO: Alterado de ProductService para a classe de implementação impl

    @Test
    void shouldCreateProductWhenCategoryIsValid() { // ✅ TRADUZIDO
        var request = new ProductRequestDTO(
                "Bluetooth Headphone",
                "Description",
                BigDecimal.valueOf(199.90),
                null,
                10,
                "img.png",
                1L
        );
        var category = new Category(1L, "Electronics", "electronics", null);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        productService.create(request);

        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void shouldThrowExceptionWhenCategoryDoesNotExist() { // ✅ TRADUZIDO
        var request = new ProductRequestDTO(
                "Product X",
                null,
                BigDecimal.TEN,
                null,
                5,
                null,
                99L
        );

        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        assertThat(catchException(() -> productService.create(request)))
                .isInstanceOf(EntityNotFoundException.class); // 💡 Ajustado para a exceção lançada na sua classe impl
    }

    private Exception catchException(Runnable runnable) {
        try {
            runnable.run();
            return null;
        } catch (Exception e) {
            return e;
        }
    }
}
