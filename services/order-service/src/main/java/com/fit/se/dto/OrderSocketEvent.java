package com.fit.se.dto;

import com.fit.se.entity.OrderStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderSocketEvent {
    private String type; // ORDER_CREATED | ORDER_STATUS_UPDATED
    private Long orderId;
    private Long userId;
    private String customerName;
    private OrderStatus status;
    private Double totalAmount;
    private String message;
}