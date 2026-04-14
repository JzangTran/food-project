package com.fit.se.dto;

import com.fit.se.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrderStatusRequest {
    @NotNull
    private OrderStatus status;
}