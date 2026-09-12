package com.ecomerce.repository;

import com.ecomerce.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    // Métodos de CRUD base fornecidos pelo JpaRepository
}

