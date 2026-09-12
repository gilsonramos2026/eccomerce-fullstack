package com.ecomerce.repository;

import com.ecomerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 💡 Essencial para o e-commerce: Permite listar o histórico de pedidos de um usuário com paginação
    Page<Order> findByUserId(Long userId, Pageable pageable);
}

