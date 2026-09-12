package com.ecomerce.controller;

import com.ecomerce.dto.product.ProductRequestDTO;
import com.ecomerce.dto.product.ProductResponseDTO;
import com.ecomerce.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Produtos", description = "Endpoints de gerenciamento do catálogo")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Lista todos os produtos com paginação")
    public ResponseEntity<Page<ProductResponseDTO>> findAll(Pageable  pageable) {
        return ResponseEntity.ok(productService.findAll(pageable));
    }

    @GetMapping("/search") // 💡 ADICIONADO: Endpoint de busca de produtos por termo
    @Operation(summary = "Busca produtos por nome ou descrição com paginação")
    public ResponseEntity<Page<ProductResponseDTO>> search(
            @RequestParam("query") String  query,
            Pageable pageable
    ) {
        return ResponseEntity.ok(productService.search(query, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca produto por ID")
    public ResponseEntity<ProductResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Cria um novo produto (admin)")
    public ResponseEntity<ProductResponseDTO> create(@Valid @RequestBody ProductRequestDTO dto) {
        ProductResponseDTO created = productService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um produto por ID (admin)")
    public ResponseEntity<ProductResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDTO dto) {
        return ResponseEntity.ok(productService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remove um produto do catálogo por ID (admin)")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
