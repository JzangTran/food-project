package com.fit.se.dto;

import com.fit.se.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String token;
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private Role role;
}
