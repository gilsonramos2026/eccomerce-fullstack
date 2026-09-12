package com.ecomerce.exception; // 🔴 Ajuste para com.ecomerce caso seu projeto use o nome antigo

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
