package com.ecomerce.service;

import com.ecomerce.dto.order.OrderRequestDTO;
import com.ecomerce.dto.order.OrderResponseDTO;
import com.ecomerce.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    OrderResponseDTO create(OrderRequestDTO dto);
    OrderResponseDTO findById(Long id);
    Page<OrderResponseDTO> findAll(Pageable pageable);
    Page<OrderResponseDTO> findMyOrders(Pageable pageable);
    OrderResponseDTO updateStatus(Long id, Status status);
}

