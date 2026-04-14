package com.fit.se.service;

import com.fit.se.dto.LoginRequest;
import com.fit.se.dto.LoginResponse;
import com.fit.se.dto.RegisterRequest;
import com.fit.se.dto.UserResponse;
import com.fit.se.entity.Role;
import com.fit.se.entity.User;
import com.fit.se.repository.UserRepository;
import com.fit.se.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email da ton tai");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("So dien thoai da ton tai");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : Role.USER)
                .build();

        User saved = userRepository.save(user);

        return UserResponse.builder()
                .id(saved.getId())
                .fullName(saved.getFullName())
                .email(saved.getEmail())
                .phone(saved.getPhone())
                .role(saved.getRole())
                .build();
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email hoac mat khau khong dung"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Email hoac mat khau khong dung");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return LoginResponse.builder()
                .token(token)
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .build();
    }
}
