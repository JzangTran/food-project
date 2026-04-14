package com.fit.se.service;

import com.fit.se.dto.UserResponse;
import com.fit.se.entity.User;
import com.fit.se.exception.ResourceNotFoundException;
import com.fit.se.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .fullName(user.getFullName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .role(user.getRole())
                        .build())
                .toList();
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user voi id = " + id));

        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .build();
    }
}
