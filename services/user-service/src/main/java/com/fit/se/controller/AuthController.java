package com.fit.se.controller;

import com.fit.se.dto.*;
import com.fit.se.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest request) {
        UserResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .success(true)
                .message("Dang ky thanh cong")
                .data(response)
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.<LoginResponse>builder()
                .success(true)
                .message("Dang nhap thanh cong")
                .data(response)
                .build());
    }
}
