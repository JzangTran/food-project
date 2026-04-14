package com.fit.se.dto;

import com.fit.se.entity.PaymentMethod;
import com.fit.se.entity.PaymentStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {
    private Long id;
    private Long orderId;
    private PaymentMethod method;
    private PaymentStatus status;
    private LocalDateTime paidAt;
}