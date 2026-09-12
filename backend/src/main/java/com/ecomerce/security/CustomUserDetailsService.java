package com.ecomerce.security;

import com.ecomerce.entity.User;
import com.ecomerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException { // 🔴 CORRIGIDO: Adicionado throws explicitamente
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o e-mail: " + email));

        // 💡 Transforma o papel cadastrado em autoridade padrão entendida pelo Spring Security (Ex: ROLE_CUSTOMER ou ROLE_ADMIN)
        String roleName = user.getRole() instanceof Enum ? ((Enum<?>) user.getRole()).name() : user.getRole().toString();

        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPasswordHash())
                .authorities("ROLE_" + roleName.toUpperCase())
                .build();
    }
}
