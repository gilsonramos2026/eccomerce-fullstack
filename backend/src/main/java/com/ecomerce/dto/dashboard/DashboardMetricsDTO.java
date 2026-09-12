package com.ecomerce.dto.dashboard; // 🔴 CORRIGIDO: Alinhado para o pacote padrão com.ecomerce e subpasta dashboard

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;

@Schema(description = "Métricas resumidas para consolidação do painel gerencial administrativo")
public record DashboardMetricsDTO(

        @Schema(description = "Contagem total de todos os pedidos realizados na plataforma", example = "142")
        long totalOrders,

        @Schema(description = "Faturamento financeiro bruto consolidado do e-commerce", example = "24850.90")
        BigDecimal totalRevenue,

        @Schema(description = "Quantidade total de produtos cadastrados no catálogo", example = "48")
        long totalProducts,

        @Schema(description = "Contagem de produtos ativos operando com estoque crítico (abaixo de 5 unidades)", example = "3")
        long lowStockProducts
) {}
