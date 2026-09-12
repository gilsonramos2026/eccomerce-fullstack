package com.ecomerce.service.impl;

import com.ecomerce.dto.order.OrderRequestDTO;
import com.ecomerce.dto.order.OrderResponseDTO;
import com.ecomerce.entity.Order;
import com.ecomerce.entity.OrderItem;
import com.ecomerce.entity.Product;
import com.ecomerce.entity.User;
import com.ecomerce.entity.enums.Status;
import com.ecomerce.mapper.OrderMapper;
import com.ecomerce.repository.OrderRepository;
import com.ecomerce.repository.ProductRepository;
import com.ecomerce.repository.UserRepository;
import com.ecomerce.service.OrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;

    @Override
    @Transactional
    public OrderResponseDTO create(OrderRequestDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o e-mail: " + email));

        Order order = Order.builder()
                .user(user)
                .status(Status.PENDING)
                .shippingAddress(dto.shippingAddress())
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal total = BigDecimal.ZERO;

        for (var itemDto : dto.items()) {
            Product product = productRepository.findById(itemDto.productId())
                    .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com o ID: " + itemDto.productId()));

            if (product.getStockQuantity() < itemDto.quantity()) {
                throw new IllegalStateException("Estoque insuficiente para o produto: " + product.getName());
            }

            product.setStockQuantity(product.getStockQuantity() - itemDto.quantity());

            BigDecimal unitPrice = product.getDiscountPrice() != null
                    ? product.getDiscountPrice() : product.getPrice();

            OrderItem item = OrderItem.builder()
                    .product(product)
                    .quantity(itemDto.quantity())
                    .unitPrice(unitPrice)
                    .build();

            order.addItem(item);
            total = total.add(unitPrice.multiply(BigDecimal.valueOf(itemDto.quantity())));
        }

        order.setTotalAmount(total);
        Order savedOrder = orderRepository.save(order);

        return orderMapper.toResponseDTO(savedOrder);
    }

    @Override
    public OrderResponseDTO findById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado com o ID: " + id));
        return orderMapper.toResponseDTO(order);
    }

    @Override
    public Page<OrderResponseDTO> findAll(Pageable pageable) {
        return orderRepository.findAll(pageable).map(orderMapper::toResponseDTO);
    }

    @Override
    public Page<OrderResponseDTO> findMyOrders(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o e-mail: " + email));

        return orderRepository.findByUserId(user.getId(), pageable).map(orderMapper::toResponseDTO);
    }

    @Override
    @Transactional
    public OrderResponseDTO updateStatus(Long id, Status status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado com o ID: " + id));

        order.setStatus(status);
        return orderMapper.toResponseDTO(order);
    }
}
