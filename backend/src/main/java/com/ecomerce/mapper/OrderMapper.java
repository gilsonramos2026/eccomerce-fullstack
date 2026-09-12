package com.ecomerce.mapper;

import com.ecomerce.dto.order.OrderItemResponseDTO;
import com.ecomerce.dto.order.OrderResponseDTO;
import com.ecomerce.entity.Order;
import com.ecomerce.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", source = "user.name")
    OrderResponseDTO toResponseDTO(Order order);

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    OrderItemResponseDTO toItemResponseDTO(OrderItem orderItem);
}

