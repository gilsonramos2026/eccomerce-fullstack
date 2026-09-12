package com.ecomerce.entity.enums;

public enum Status {
    PENDING,     // Pedido criado, aguardando pagamento
    PAID,        // Pagamento confirmado
    SHIPPED,     // Enviado/Em transporte
    DELIVERED,   // Entregue ao cliente
    CANCELED     // Pedido cancelado
}
