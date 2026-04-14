package com.fit.se.controller;

import com.fit.se.dto.ApiResponse;
import com.fit.se.dto.UserResponse;
import com.fit.se.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.<List<UserResponse>>builder()
                .success(true)
                .message("Lay danh sach user thanh cong")
                .data(users)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .success(true)
                .message("Lay thong tin user thanh cong")
                .data(user)
                .build());
    }
}