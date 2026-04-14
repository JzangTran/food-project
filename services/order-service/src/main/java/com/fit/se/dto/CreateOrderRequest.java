package com.fit.se.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {
    @NotNull
    private Long userId;

    @Valid
    @NotEmpty
    private List<CreateOrderItemRequest> items;
}