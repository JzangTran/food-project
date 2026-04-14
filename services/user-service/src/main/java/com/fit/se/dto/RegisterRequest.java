package com.fit.se.dto;

import com.fit.se.entity.Role;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    @Size(min = 6)
    private String password;

    private Role role;
}
