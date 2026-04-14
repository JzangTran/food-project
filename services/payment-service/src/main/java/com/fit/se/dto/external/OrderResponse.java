package com.fit.se.dto.external;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private Long userId;
    private String customerName;
    private String email;
    private String phone;
    private Double totalAmount;
    private String status;
}