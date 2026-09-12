package com.ecomerce.service.impl;

import com.ecomerce.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private static final List<String> ALLOWED_TYPES = List.of("image/png", "image/jpeg", "image/webp");
    private static final long MAX_SIZE_BYTES = 5 * 1024 * 1024;

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Value("${app.upload.public-path}")
    private String publicPath;

    @Override
    public String store(MultipartFile file) {
        validate(file);
        try {
            Path directory = Path.of(uploadDir);
            Files.createDirectories(directory);

            String extension = getExtension(file.getOriginalFilename());
            String fileName = UUID.randomUUID() + extension;
            Path destination = directory.resolve(fileName);

            file.transferTo(destination);
            return publicPath + "/" + fileName;
        } catch (IOException e) {
            throw new IllegalStateException("Falha ao salvar arquivo: " + e.getMessage(), e);
        }
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("O arquivo enviado está vazio.");
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new IllegalArgumentException("Tipo de arquivo não permitido. Use PNG, JPEG ou WEBP.");
        }
        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new IllegalArgumentException("O arquivo excede o limite de tamanho permitido de 5MB.");
        }
    }

    private String getExtension(String originalName) {
        if (originalName == null || !originalName.contains(".")) return "";
        return originalName.substring(originalName.lastIndexOf('.'));
    }
}
