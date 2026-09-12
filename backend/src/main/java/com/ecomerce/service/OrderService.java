package com.ecomerce.service;

import com.ecomerce.dto.order.OrderRequestDTO;
import com.ecomerce.dto.order.OrderResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    OrderResponseDTO create(OrderRequestDTO dto);
    OrderResponseDTO findById(Long id);
    Page<OrderResponseDTO> findAll(Pageable pageable);
}

