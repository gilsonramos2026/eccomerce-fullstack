package com.ecomerce.controller;

import com.ecomerce.dto.order.OrderRequestDTO;
import com.ecomerce.dto.order.OrderResponseDTO;
import com.ecomerce.entity.enums.Status;
import com.ecomerce.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Tag(name = "Pedidos", description = "Endpoints para criação, consultas e gerenciamento de fluxo de compras")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Cria um novo pedido para o usuário autenticado")
    public ResponseEntity<OrderResponseDTO> create(@Valid @RequestBody OrderRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.create(dto));
    }

    @GetMapping("/me")
    @Operation(summary = "Recupera o histórico de pedidos do cliente logado")
    public ResponseEntity<Page<OrderResponseDTO>> findMyOrders(Pageable pageable) {
        return ResponseEntity.ok(orderService.findMyOrders(pageable));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Lista todos os pedidos da plataforma com paginação (Admin)")
    public ResponseEntity<Page<OrderResponseDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(orderService.findAll(pageable));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Atualiza o status de progresso de um pedido (Admin)")
    public ResponseEntity<OrderResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam("status") Status status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }
}
