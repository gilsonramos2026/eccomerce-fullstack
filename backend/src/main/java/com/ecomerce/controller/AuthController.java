package com.ecomerce.controller;

import com.ecomerce.dto.user.AuthResponseDTO;
import com.ecomerce.dto.user.LoginRequestDTO;
import com.ecomerce.dto.user.RegisterRequestDTO;
import com.ecomerce.entity.User;
import com.ecomerce.entity.enums.Role;
import com.ecomerce.repository.UserRepository;
import com.ecomerce.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "Endpoints para registro e login de usuários")
public class AuthController {

    private final UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/register")
    @Operation(summary = "Registra um novo cliente no e-commerce")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado no sistema."); // 🔴 CORRIGIDO: Removido BusinessException ausente
        }

        User user = User.builder()
                .name(dto.name())
                .email(dto.email())
                .passwordHash(passwordEncoder.encode(dto.password()))
                .role(Role.CUSTOMER)
                .build();
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponseDTO(token, user.getName(), user.getRole().name()));
    }

    @PostMapping("/login")
    @Operation(summary = "Autentica um usuário e retorna o token JWT")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password()));

        User user = userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("Usuário não encontrado."));

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return ResponseEntity.ok(new AuthResponseDTO(token, user.getName(), user.getRole().name()));
    }
}
