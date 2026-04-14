package com.fit.se.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderItemRequest {
    @NotNull
    private Long foodId;

    @NotNull
    @Min(1)
    private Integer quantity;
}