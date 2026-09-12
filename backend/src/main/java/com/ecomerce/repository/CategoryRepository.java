package com.ecomerce.repository;

import com.ecomerce.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // 💡 Método essencial para e-commerce: buscar categoria pela URL amigável (slug)
    Optional<Category> findBySlug(String slug);

    // 💡 Método de segurança para validar se um slug já existe antes de salvar
    boolean existsByName(String slug);

    boolean existsBySlug(String slug);
}
