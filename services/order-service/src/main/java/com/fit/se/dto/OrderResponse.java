package com.fit.se.dto;

import com.fit.se.entity.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private Long userId;
    private String customerName;
    private String email;
    private String phone;
    private Double totalAmount;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;
}