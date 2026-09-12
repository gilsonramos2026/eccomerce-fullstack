package com.ecomerce.controller;

import com.ecomerce.dto.dashboard.DashboardMetricsDTO; // 🔴 CORRIGIDO: Import correto do DTO
import com.ecomerce.service.DashboardService; // 🔴 CORRIGIDO: Import correto do serviço
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity; // 💡 Adicionado para retorno HTTP explícito
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Dashboard", description = "Endpoints administrativos para consolidação de métricas e relatórios")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/metrics")
    @Operation(summary = "Recupera os indicadores consolidados do e-commerce (Admin)")
    public ResponseEntity<DashboardMetricsDTO> getMetrics() {
        // 💡 Retorna 200 OK envelopado de forma padronizada
        return ResponseEntity.ok(dashboardService.getMetrics());
    }
}
