package com.ecomerce.service; // 🔴 CORRIGIDO: Alinhado para o pacote padrão com.ecomerce

import com.ecomerce.dto.order.OrderItemRequestDTO; // 🔴 CORRIGIDO: Imports dos DTOs externos
import com.ecomerce.dto.order.OrderRequestDTO;
import com.ecomerce.entity.Order;
import com.ecomerce.entity.Product;
import com.ecomerce.entity.User;
import com.ecomerce.mapper.OrderMapper;
import com.ecomerce.repository.OrderRepository;
import com.ecomerce.repository.ProductRepository;
import com.ecomerce.repository.UserRepository;
import com.ecomerce.service.impl.OrderServiceImpl; // 💡 Injetar a implementação real
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private OrderMapper orderMapper;

    @InjectMocks
    private OrderServiceImpl orderService;

    @Test
    void shouldDecreaseStockQuantityWhenOrderIsCreatedSuccessfully() { // ✅ TRADUZIDO
        // Simula o contexto de um usuário autenticado no Spring Security
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("client@test.com", null, List.of()));

        var user = User.builder().id(1L).email("client@test.com").build();
        var product = Product.builder()
                .id(10L)
                .name("Mouse")
                .price(BigDecimal.valueOf(100))
                .stockQuantity(5)
                .build();

        // Configuração dos comportamentos dos mocks
        when(userRepository.findByEmail("client@test.com")).thenReturn(Optional.of(user));
        when(productRepository.findById(10L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var request = new OrderRequestDTO(
                "Rua A, 123",
                List.of(new OrderItemRequestDTO(10L, 2))
        );

        orderService.create(request);

        // Asserts do fluxo de negócio
        assertThat(product.getStockQuantity()).isEqualTo(3);
        verify(orderRepository, times(1)).save(any(Order.class));
    }
}
