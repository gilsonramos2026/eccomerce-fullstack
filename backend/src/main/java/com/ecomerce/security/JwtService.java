package com.ecomerce.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtService {

    @Value("${app.jwt.secret:uma_chave_secreta_padrao_muito_longa_com_mais_de_256_bits_para_o_ecommerce}") // 💡 Fallback seguro para evitar erros de chave curta
    private String secret;

    @Value("${app.jwt.expiration-ms:86400000}") // 💡 Fallback padrão de 24 horas caso não configurado no yml
    private long expirationMs;

    private SecretKey key() {
        // Garante que os bytes tenham tamanho seguro (mínimo de 32 bytes / 256 bits) para HMAC-SHA
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            return Keys.hmacShaKeyFor("chave_reserva_segura_com_mais_de_32_bytes_para_producao_do_app".getBytes(StandardCharsets.UTF_8));
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key())
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean isValid(String token) {
        try {
            Jwts.parser().verifyWith(key()).build().parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

