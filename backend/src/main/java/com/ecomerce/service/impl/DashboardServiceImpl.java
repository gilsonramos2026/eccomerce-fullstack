package com.ecomerce.service.impl;

import com.ecomerce.dto.dashboard.DashboardMetricsDTO;
import com.ecomerce.repository.OrderRepository;
import com.ecomerce.repository.ProductRepository;
import com.ecomerce.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Override
    public DashboardMetricsDTO getMetrics() {
        // ✅ OTIMIZADO: Consultas agregadas diretas no banco de dados. Memória RAM poupada!
        long totalOrders = orderRepository.count();
        java.math.BigDecimal revenue = orderRepository.sumTotalRevenue();
        long totalProducts = productRepository.count();
        long lowStock = productRepository.countByStockQuantityLessThan(10);

        return new DashboardMetricsDTO(totalOrders, revenue, totalProducts, lowStock);
    }
}

