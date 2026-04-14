package com.fit.se.dto;

import com.fit.se.entity.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    @NotNull
    private Long orderId;

    @NotNull
    private PaymentMethod method;
}